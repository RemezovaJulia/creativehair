package models

import (
	"time"
)

type Appointment struct {
	Id              int
	ClientName      string    `json:"client_name" db:"client_name"`
	ClientPhone     string    `json:"client_phone" db:"client_phone"`
	ClientEmail     string    `json:"client_email" db:"client_email"`
	AppointmentTime time.Time `json:"appointment_time" db:"appointment_time"`
	ServiceId       int       `json:"service_id" db:"service_id"`
	EmployeeId      int       `json:"employee_id" db:"employee_id"`
	IsOpen          bool      `json:"is_open" db:"is_open"`
}

type DailySchedule struct {
	ID          int
	EmployeeID  int         `json:"employee_id"`
	Date        time.Time   `json:"date"`
	TimeSlots   []time.Time `json:"time_slots"`
	IsAvailable bool        `json:"is_available"`
}
