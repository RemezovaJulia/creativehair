package handlers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context, app *app.App) {
	service := services.NewEmployeeService(app.DB, &models.Employee{})
	employees, err := service.GetAllEmployee(context.Background())
	if err != nil {
		fmt.Printf("%v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Ошибка сервера",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"employees": employees,
	})
}

func FriedUser(c *gin.Context, app *app.App) {
	var UserID struct {
		Id int `json:"id"`
	}

	if err := c.BindJSON(&UserID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Ошибка парсинга данных",
		})
	}

	service := services.NewEmployeeService(app.DB, &models.Employee{})
	err := service.FriedEmployeeById(context.Background(), UserID.Id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "Ошибка сервера",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Пользователь успешно Уволен",
	})
}

func RevertUser(c *gin.Context, app *app.App) {
	var UserID struct {
		Id int `json:"id"`
	}

	if err := c.BindJSON(&UserID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Ошибка парсинга данных",
		})
	}

	service := services.NewEmployeeService(app.DB, &models.Employee{})
	err := service.RevertEmployeeById(context.Background(), UserID.Id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "Ошибка сервера",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Пользователь успешно Вернут",
	})
}
