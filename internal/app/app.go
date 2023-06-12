package app

import (
	"github.com/RemezovaJulia/creativehair/internal/config"
	"github.com/RemezovaJulia/creativehair/internal/datastore"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type App struct {
	DB     *pgxpool.Pool
	Router *gin.Engine
	Cache  *datastore.Cache
	Config *config.Config
}

func NewApp(cfg *config.Config) (*App, error) {
	db, err := datastore.NewDBPool(cfg)
	if err != nil {
		return nil, err
	}
	router := gin.Default()
	gin.SetMode(cfg.GinMode)
	cache := datastore.NewCache(db)
	_, err = cache.LoadSchedule()

	if err != nil {
		return nil, err
	}

	err = cache.LoadEmployees()
	if err != nil {
		return nil, err
	}
	return &App{DB: db, Router: router, Cache: cache, Config: cfg}, nil
}

func (a *App) Run() error {
	return a.Router.Run(":" + a.Config.APPPort)
}
