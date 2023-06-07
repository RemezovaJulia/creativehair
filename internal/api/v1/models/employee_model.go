package models

import (
	"database/sql"
	"time"
)

// Employee структура для хранения данных о сотруднике
type Employee struct {
	Id            int
	Login         string
	Password      []byte
	Name          string
	Phone         string
	Email         string
	About         sql.NullString
	RoleId        int
	CreatedBy     int
	HireDate      time.Time
	DismissalDate *time.Time
	Active        bool
	TotalEarnings float64
	Photo         sql.NullString
}
