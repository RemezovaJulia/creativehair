package services

import (
	"context"
	"fmt"
	"time"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/jackc/pgtype"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AppointmentService struct {
	db          *pgxpool.Pool
	appointment *models.Appointment
}

func NewAppointmentService(db *pgxpool.Pool, appointment *models.Appointment) *AppointmentService {
	return &AppointmentService{
		db:          db,
		appointment: appointment,
	}
}

func (s *AppointmentService) RecordAppointment(open, close pgtype.Time, haircut pgtype.Interval, timeSlot time.Time) error {
	// Проверка наличия записи в таблице daily_schedule
	var schedule models.DailySchedule
	schedule.Date = s.appointment.AppointmentTime
	dateWithoutTime := time.Date(schedule.Date.Year(), schedule.Date.Month(), schedule.Date.Day(), 0, 0, 0, 0, schedule.Date.Location())

	err := s.db.QueryRow(context.Background(),
		"SELECT id, time_slots, is_available FROM daily_schedule WHERE date::date = $1 AND employee_id = $2",
		dateWithoutTime, s.appointment.EmployeeId).Scan(
		&schedule.ID, &schedule.TimeSlots, &schedule.IsAvailable)
	isNewAppointment := false
	if err != nil {
		if err != pgx.ErrNoRows {
			return fmt.Errorf("ошибка при выполнении запроса: %w", err)
		}

		// Создание новой записи в таблице daily_schedule, если записи не существует
		timeSlots, err := s.GenerationsTimeSlots(open, close, haircut, timeSlot)

		if err != nil {
			return err
		}

		schedule.EmployeeID = s.appointment.EmployeeId
		schedule.TimeSlots = timeSlots
		schedule.IsAvailable = true

		_, err = s.db.Exec(context.Background(),
			"INSERT INTO daily_schedule (employee_id, date, time_slots, is_available) VALUES ($1, $2, $3, $4)",
			schedule.EmployeeID, schedule.Date, schedule.TimeSlots, schedule.IsAvailable)

		isNewAppointment = true
		if err != nil {
			return fmt.Errorf("ошибка при создании записи в таблице daily_schedule: %w", err)
		}
	}

	if !isNewAppointment {
		// Проверка наличия временного слота в расписании
		timeSlotIndex := -1
		for i, slot := range schedule.TimeSlots {
			if slot.Hour() == timeSlot.Hour() {
				timeSlotIndex = i
				break
			}
		}

		if timeSlotIndex == -1 {
			return fmt.Errorf("Временной слот  недоступен")
		}

		// Удаление временного слота из расписания
		schedule.TimeSlots = append(schedule.TimeSlots[:timeSlotIndex], schedule.TimeSlots[timeSlotIndex+1:]...)

		// Проверка, является ли это последним временным слотом
		if len(schedule.TimeSlots) == 0 {
			schedule.IsAvailable = false
		}
	}

	// Обновление записи в таблице daily_schedule
	_, err = s.db.Exec(context.Background(),
		"UPDATE daily_schedule SET time_slots = $1, is_available = $2 WHERE id = $3",
		schedule.TimeSlots, schedule.IsAvailable, schedule.ID)

	if err != nil {
		return fmt.Errorf("ошибка при обновлении записи в таблице daily_schedule: %w", err)
	}

	// Запись данных о клиенте в таблицу appointments
	_, err = s.db.Exec(context.Background(),
		`INSERT INTO appointments (client_name, client_phone, client_email, appointment_time,  employee_id, is_open) 
				VALUES ($1, $2, $3, $4, $5, $6)`,
		s.appointment.ClientName, s.appointment.ClientPhone, s.appointment.ClientEmail, s.appointment.AppointmentTime,
		s.appointment.EmployeeId, s.appointment.IsOpen)

	if err != nil {
		return fmt.Errorf("ошибка при создании записи в таблице appointments: %w", err)
	}

	return nil
}

func (s *AppointmentService) GenerationsTimeSlots(open, close pgtype.Time, haircut pgtype.Interval, timeSlot time.Time) ([]time.Time, error) {
	timeSlotsCount, err := GetTimeSlotCount(open, close, haircut)
	if err != nil {
		return nil, err
	}
	timeSlots := make([]time.Time, 0, timeSlotsCount)

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

		if currentTime.Hour() == timeSlot.Hour() {
			currentTime = currentTime.Add(haircutInterval)
			continue
		}

		timeSlots = append(timeSlots, currentTime)
		currentTime = currentTime.Add(haircutInterval)
		if currentTime.Hour() >= closingTime.Hour() {
			break
		}
	}

	return timeSlots, nil
}

type Appointment struct {
	Id              int
	ClientName      string    `json:"client_name" db:"client_name"`
	ClientPhone     string    `json:"client_phone" db:"client_phone"`
	ClientEmail     string    `json:"client_email" db:"client_email"`
	AppointmentTime time.Time `json:"appointment_time" db:"appointment_time"`
	EmployeeId      int       `json:"employee_id" db:"employee_id"`
	CreateAt        time.Time `json:"create_at" db:"create_at"`
	IsOpen          bool      `json:"is_open" db:"is_open"`
}

func (s *AppointmentService) GetAppointmentsById(employeeID int, isOpen bool) ([]Appointment, error) {
	appointments := make([]Appointment, 0)
	query := `SELECT * FROM appointments WHERE employee_id = $1 AND is_open = $2`
	rows, err := s.db.Query(context.Background(), query, employeeID, isOpen)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		appointment := Appointment{}
		err := rows.Scan(&appointment.Id, &appointment.ClientName, &appointment.ClientPhone,
			&appointment.ClientEmail, &appointment.AppointmentTime,
			&appointment.EmployeeId, &appointment.CreateAt, &appointment.IsOpen)
		if err != nil {
			return nil, err
		}

		appointments = append(appointments, appointment)
	}

	return appointments, nil
}

func (s *AppointmentService) CancelAppointmentsById(appointmentID, employeeID int, date string, timeslot string) error {
	query := `DELETE FROM appointments WHERE id = $1`
	_, err := s.db.Exec(context.Background(), query, appointmentID)
	if err != nil {
		return err
	}

	dateParse, err := time.Parse("2006-01-02", date)
	if err != nil {
		return err
	}

	timeParse, err := time.Parse("15:04", timeslot)
	if err != nil {
		return err
	}

	query = `SELECT time_slots FROM daily_schedule WHERE employee_id = $1  AND DATE_TRUNC('day', date::date) = DATE_TRUNC('day', $2::date)`
	row := s.db.QueryRow(context.Background(), query, employeeID, dateParse)
	var timeSlots []time.Time
	err = row.Scan(&timeSlots)
	if err != nil {
		return err
	}
	isAppended := false
	newTimeslots := make([]time.Time, 0, len(timeSlots)+1)
	for _, timeSlot := range timeSlots {
		if (timeSlot.Hour() > timeParse.Hour()) && !isAppended {
			newTimeslots = append(newTimeslots, timeParse)
			isAppended = true
		}
		newTimeslots = append(newTimeslots, timeSlot)
	}
	if !isAppended {
		newTimeslots = append(newTimeslots, timeParse)
	}

	query = `UPDATE daily_schedule SET time_slots = $1, is_available=true WHERE employee_id = $2 AND DATE_TRUNC('day', date::date) = DATE_TRUNC('day', $3::date)`
	_, err = s.db.Exec(context.Background(), query, newTimeslots, employeeID, dateParse)

	return err
}

func (s *AppointmentService) CloseAppointmentsById(appointmentID int) error {
	query := `UPDATE appointments SET is_open=false WHERE id = $1`
	_, err := s.db.Exec(context.Background(), query, appointmentID)
	if err != nil {
		return err
	}

	return nil
}
