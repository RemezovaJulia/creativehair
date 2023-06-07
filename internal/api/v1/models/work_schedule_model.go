package models

import (
	"github.com/jackc/pgtype"
)

type WorkSchedule struct {
	ID              int             `json:"id" db:"id"`
	Open            pgtype.Time     `json:"open" db:"opening_time"`
	Close           pgtype.Time     `json:"close" db:"closing_time"`
	HaircutInterval pgtype.Interval `json:"haircut_interval" db:"haircut_interval"`
	WeekendDays     []int           `json:"weekend_days" db:"weekend_days"`
}
