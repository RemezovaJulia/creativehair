package handlers

import (
	"context"
	"net/http"
	"sort"
	"time"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgtype"
)

func HomeHandler(c *gin.Context, app *app.App) {
	employees := app.Cache.Employees()
	session := sessions.Default(c)
	userID := session.Get("user_id")
	isAuthenticated := userID != nil

	c.HTML(http.StatusOK, "home.gohtml", gin.H{"employees": employees,
		"isAuthenticated": isAuthenticated})
}

func GetGalleryHandler(c *gin.Context, app *app.App) {
	service := services.NewGalleryService(app.DB)
	gallery, err := service.GetGallery(context.Background())
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения фотографий"})
		return
	}
	c.JSON(http.StatusOK, gallery)
}

func GetCalendarHandler(c *gin.Context, app *app.App) {
	calendarService := services.NewCalendarService(app.DB, &models.Calendar{})
	startDate := time.Now().Truncate(24 * time.Hour) // Начальная дата (текущая дата)
	endDate := startDate.AddDate(0, 1, 0)
	weekends := app.Cache.Schedule().WeekendDays
	calendar, err := calendarService.GetCalendar(startDate, endDate, weekends)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}
	// Сортировка массива Calendar по полю Date
	sort.Slice(calendar, func(i, j int) bool {
		return calendar[i].Date.Time.Before(calendar[j].Date.Time)
	})
	c.JSON(http.StatusOK, gin.H{"calendar": calendar, "weekends": weekends})
}

func GetTimeSlotsHandler(c *gin.Context, app *app.App) {
	calendarService := services.NewCalendarService(app.DB, &models.Calendar{})
	var data struct {
		EmployeeSelect int         ` json:"employee_select"`
		Date           pgtype.Date `json:"date"`
	}
	if err := c.BindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Структура не соответствует"})
		return
	}
	schedule := app.Cache.Schedule()

	timeSlots, err := calendarService.GetTimeSlot(data.EmployeeSelect, data.Date, schedule.Open,
		schedule.Close, schedule.HaircutInterval)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"time_slots": timeSlots})
}
