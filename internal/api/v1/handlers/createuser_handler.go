package handlers

import (
	"context"
	"net/http"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func CreateUserHandler(c *gin.Context, app *app.App) {
	var Employee services.Employee
	if err := c.BindJSON(&Employee); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Структура не соответствует"})
		return
	}
	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}

	service := services.NewEmployeeService(app.DB, &models.Employee{})
	if err := service.CreateEmployee(context.Background(), Employee, id); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при создании пользователя"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Пользователь успешно создан"})
}

func HasLoginHandler(c *gin.Context, app *app.App) {
	var UserData struct {
		Login string `json:"login"`
	}
	if err := c.BindJSON(&UserData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Структура не соответствует"})
		return
	}

	service := services.NewEmployeeService(app.DB, &models.Employee{})
	employee, err := service.GetEmployeeByLogin(context.Background(), UserData.Login)
	if err != nil {
		if err != pgx.ErrNoRows {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка при получении данных"})
			return
		}
	}

	if employee != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Такой логин уже есть"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"login": UserData.Login})
}
