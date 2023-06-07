package models

import "github.com/jackc/pgtype"

type Calendar struct {
	Date          pgtype.Date
	EmployeesId   []*int
	EmployeesName []*string
}
