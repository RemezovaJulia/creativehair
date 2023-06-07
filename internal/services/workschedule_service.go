package services

import (
	"context"
	"time"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/jackc/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type WorkSchedule struct {
	Open            *string `json:"open,omitempty"`
	Close           *string `json:"close,omitempty"`
	HaircutInterval *string `json:"haircut_interval,omitempty"`
	WeekendDays     *[]int  `json:"weekend_days,omitempty"`
}

type WorkScheduleService struct {
	db       *pgxpool.Pool
	schedule *models.WorkSchedule
}

func NewWorkScheduleService(db *pgxpool.Pool, schedule *models.WorkSchedule) *WorkScheduleService {
	return &WorkScheduleService{db: db, schedule: schedule}
}

func (s *WorkScheduleService) UpdateWorkSchedule(ctx context.Context, workSchedule *WorkSchedule, id int) (*models.WorkSchedule, error) {
	// Построение SQL-запроса с учетом переданных полей
	updateQuery := `UPDATE work_schedule SET`
	args := make([]interface{}, 0)

	if workSchedule.Open != nil {
		updateQuery += " opening_time = $1, "
		args = append(args, *workSchedule.Open)
		openTime, err := parseTime(*workSchedule.Open)
		if err != nil {
			return nil, err
		}
		s.schedule.Open = openTime
	}

	if workSchedule.Close != nil {
		updateQuery += " closing_time = $2, "
		args = append(args, *workSchedule.Close)
		closeTime, err := parseTime(*workSchedule.Close)
		if err != nil {
			return nil, err
		}
		s.schedule.Close = closeTime
	}

	if workSchedule.HaircutInterval != nil {
		updateQuery += " haircut_interval = INTERVAL '1 hour' * $3, "
		args = append(args, *workSchedule.HaircutInterval)
		hour, err := parseInterval(*workSchedule.HaircutInterval)
		if err != nil {
			return nil, err
		}
		s.schedule.HaircutInterval = hour
	}

	if workSchedule.WeekendDays != nil {
		updateQuery += " weekend_days = $4, "
		args = append(args, workSchedule.WeekendDays)
		s.schedule.WeekendDays = *workSchedule.WeekendDays
	}

	// Удаление последней запятой и пробела из SQL-запроса
	updateQuery = updateQuery[:len(updateQuery)-2]

	// Добавление условия WHERE, если требуется
	updateQuery += " WHERE id = $5"
	args = append(args, id)
	_, err := s.db.Exec(ctx, updateQuery, args...)
	return s.schedule, err
}

func (s *WorkScheduleService) GetWorkSchedule(id int) (*models.WorkSchedule, error) {
	query := `SELECT * FROM work_schedule WHERE id = $1`
	row := s.db.QueryRow(context.Background(), query, id)

	err := row.Scan(
		&s.schedule.ID, &s.schedule.Open, &s.schedule.Close, &s.schedule.HaircutInterval, &s.schedule.WeekendDays,
	)
	if err != nil {
		return nil, err
	}

	return s.schedule, nil
}

func parseTime(s string) (pgtype.Time, error) {
	layout := "15:04" // Формат строки времени
	t, err := time.Parse(layout, s)
	if err != nil {
		return pgtype.Time{}, err
	}

	// Инициализируем pg type.Time с помощью значения времени
	pgTime := pgtype.Time{}
	err = pgTime.Set(t)
	if err != nil {
		return pgtype.Time{}, err
	}

	return pgTime, nil
}

func parseInterval(s string) (pgtype.Interval, error) {
	interval := pgtype.Interval{}

	// Разбираем строку и преобразуем ее в длительность времени
	duration, err := time.ParseDuration(s + "h")
	if err != nil {
		return interval, err
	}

	// Устанавливаем значение длительности в типе pg type.Interval
	err = interval.Set(duration)
	if err != nil {
		return interval, err
	}

	return interval, nil
}
