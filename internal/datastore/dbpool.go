package datastore

import (
	"context"
	"fmt"
	"net/url"

	"github.com/RemezovaJulia/creativehair/internal/config"
	"github.com/jackc/pgx/v5/pgxpool"
)

func NewDBPool(config *config.Config) (*pgxpool.Pool, error) {
	// "postgres://username:password@localhost:5432/database_name"
	poolConfig, err := pgxpool.ParseConfig(
		fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
			url.QueryEscape(config.DBUser),
			url.QueryEscape(config.DBPass),
			config.DBHost,
			config.DBPort,
			config.DBName,
		),
	)
	poolConfig.MaxConns = 20 // максимальное количество соединений в пуле
	pool, err := pgxpool.NewWithConfig(context.Background(), poolConfig)

	if err != nil {
		return nil, err
	}

	return pool, nil
}
