package handlers

import (
	"context"
	"net/http"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-gonic/gin"
)

func GetWorkScheduleHandler(c *gin.Context, app *app.App) {
	schedule := app.Cache.Schedule()
	if &schedule.ID == nil || &schedule.HaircutInterval == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"open":             schedule.Open,
		"close":            schedule.Close,
		"haircut_interval": schedule.HaircutInterval,
		"weekend_days":     schedule.WeekendDays,
	})
}

func UpdateWorkScheduleHandler(c *gin.Context, app *app.App) {
	var WorkSchedule services.WorkSchedule

	if err := c.BindJSON(&WorkSchedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "график не соответствует структуре"})
		return
	}

	workScheduleService := services.NewWorkScheduleService(app.DB, &models.WorkSchedule{})
	schedule, err := workScheduleService.UpdateWorkSchedule(context.Background(), &WorkSchedule, 1)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}
	app.Cache.SetSchedule(schedule)
}
