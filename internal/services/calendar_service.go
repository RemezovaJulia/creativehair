package services

import (
	"context"
	"time"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/jackc/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CalendarService struct {
	db       *pgxpool.Pool
	calendar *models.Calendar
}

func NewCalendarService(db *pgxpool.Pool, calendar *models.Calendar) *CalendarService {
	return &CalendarService{db: db, calendar: calendar}
}

func (s *CalendarService) GetCalendar(startDate, endDate time.Time, weekends []int) ([]*models.Calendar, error) {
	query := `SELECT
    gs.date_series::date,
    ARRAY_AGG(e.id) AS EmployeesId,
    ARRAY_AGG(e.name) AS EmployeesName
FROM
    generate_series($1::date, $2::date, '1 day') AS gs(date_series)
        CROSS JOIN employees AS e
        LEFT JOIN daily_schedule AS d ON DATE_TRUNC('day', d.date) = DATE_TRUNC('day', gs.date_series)
                                       AND d.employee_id = e.id 
WHERE
    (d.is_available = true OR d.date IS NULL)
    AND e.role_id = 1 AND e.active = true
    AND NOT EXISTS (
        SELECT 1 FROM unnest($3::int[]) AS weekend(day) WHERE extract(dow from gs.date_series) = day
    )
GROUP BY
    gs.date_series::date;`

	rows, err := s.db.Query(context.Background(), query, startDate, endDate, weekends)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	calendar := make([]*models.Calendar, 0)
	for rows.Next() {
		item := &models.Calendar{}
		err := rows.Scan(&item.Date, &item.EmployeesId, &item.EmployeesName)
		if err != nil {
			return nil, err
		}
		calendar = append(calendar, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return calendar, nil
}

type TimeSlot struct {
	TimeSlots []time.Time `db:"time_slots"`
}

func (s *CalendarService) GetTimeSlot(userId int, date pgtype.Date, open, close pgtype.Time, haircut pgtype.Interval) (*TimeSlot, error) {
	query := `SELECT ARRAY_AGG(time_slots) AS time_slots
		FROM (
    		SELECT time_slots
    		
    		FROM daily_schedule
    		WHERE (DATE_TRUNC('day'::text, date) = DATE_TRUNC('day'::text, $1::date) AND employee_id = $2 AND is_available = true)
        	OR date IS NULL 
		) AS subquery;
	`
	var timeSlot TimeSlot

	err := s.db.QueryRow(context.Background(), query, date, userId).Scan(&timeSlot.TimeSlots)
	if err != nil {
		return nil, err
	}

	if timeSlot.TimeSlots == nil {
		timeSlotsCount, err := GetTimeSlotCount(open, close, haircut)
		if err != nil {
			return nil, err
		}
		timeSlot.TimeSlots = make([]time.Time, 0, timeSlotsCount)

		currentTime, err := ConvertToTime(open)
		if err != nil {
			return nil, err
		}
		closingTime, err := ConvertToTime(close)
		haircutInterval, err := ConvertToDuration(haircut)
		for i := 0; i < timeSlotsCount; i++ {
			timeValue := pgtype.Time{}
			err := timeValue.Set(currentTime)
			if err != nil {
				return nil, err
			}
			beforeTime, err := IsTodayBeforeTime(date.Time, currentTime)
			if err != nil {
				return nil, err
			}
			if !beforeTime {
				currentTime = currentTime.Add(haircutInterval)
				continue
			}
			timeSlot.TimeSlots = append(timeSlot.TimeSlots, currentTime)
			currentTime = currentTime.Add(haircutInterval)
			if currentTime.Hour() >= closingTime.Hour() {
				break
			}
		}
	} else {
		slots := make([]time.Time, 0, len(timeSlot.TimeSlots))
		for _, slot := range timeSlot.TimeSlots {
			timeValue := pgtype.Time{}
			err := timeValue.Set(slot)
			if err != nil {
				return nil, err
			}
			beforeTime, err := IsTodayBeforeTime(date.Time, slot)
			if err != nil {
				return nil, err
			}
			if !beforeTime {
				continue
			}
			slots = append(slots, slot)
		}
		timeSlot.TimeSlots = slots
	}
	if len(timeSlot.TimeSlots) == 0 {
		query = `UPDATE daily_schedule SET is_available = false 
                      WHERE DATE_TRUNC('day', date) = DATE_TRUNC('day', $1::date) 
                        AND employee_id = $2;`

		_, err = s.db.Exec(context.Background(), query, date, userId)
		if err != nil {
			return nil, err
		}
	}
	return &timeSlot, err
}

func IsTodayBeforeTime(date, timeslot time.Time) (bool, error) {
	location, err := time.LoadLocation("Asia/Yekaterinburg")
	if err != nil {
		return false, err
	}

	now := time.Now().In(location)
	desiredDate := time.Date(date.Year(), date.Month(), date.Day(), timeslot.Hour(), timeslot.Minute(), timeslot.Nanosecond(), 0, location)
	// Проверяем, является ли дата сегодняшней
	isToday := now.Year() == desiredDate.Year() && now.Month() == desiredDate.Month() && now.Day() == desiredDate.Day()

	// Проверяем, что время меньше указанного времени
	if isToday {
		return now.Before(desiredDate), nil
	}

	return true, nil
}

func GetTimeSlotCount(openingTime, closingTime pgtype.Time, haircutInterval pgtype.Interval) (int, error) {
	var opening, closing time.Time
	err := openingTime.AssignTo(&opening)
	if err != nil {
		return 0, err
	}
	err = closingTime.AssignTo(&closing)
	if err != nil {
		return 0, err
	}

	var interval time.Duration
	err = haircutInterval.AssignTo(&interval)
	if err != nil {
		return 0, err
	}

	slotCount := int((closing.Sub(opening)) / interval)
	return slotCount, nil
}

func ConvertToTime(pgt pgtype.Time) (time.Time, error) {
	if pgt.Status == pgtype.Present {
		hours := pgt.Microseconds / 3600000000
		minutes := (pgt.Microseconds % 3600000000) / 60000000
		seconds := (pgt.Microseconds % 60000000) / 1000000
		return time.Date(0, 1, 1, int(hours), int(minutes), int(seconds), 0, time.UTC), nil
	}

	return time.Time{}, nil
}

func ConvertToDuration(pgi pgtype.Interval) (time.Duration, error) {
	if pgi.Status == pgtype.Present {
		duration := time.Duration(pgi.Microseconds) * time.Microsecond
		return duration, nil
	}

	return 0, nil
}
