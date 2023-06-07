package handlers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func LoginHandler(c *gin.Context, app *app.App) {
	// создаем объект сервиса, который позволит нам искать пользователя в базе данных.
	employeeService := services.NewEmployeeService(app.DB, &models.Employee{})
	// создаем структуру, для хранения данных авторизации.
	var loginData struct {
		Login    string `json:"login" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	// получаем данные аутентификации из запроса
	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "логин или пароль не соответствуют структуре запроса"})
		return
	}
	// ищем пользователя в базе данных по его логину.
	employee, err := employeeService.GetEmployeeByLogin(context.Background(), loginData.Login)

	if err != nil {
		if err == pgx.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверное имя пользователя или пароль!"})
		} else {
			fmt.Printf("%v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера db"})
		}
		fmt.Printf("%v\n", err)
		return
	}
	// проверяем пароль.
	if err := services.CheckPasswordHash(loginData.Password, employee.Password); err != nil || !employee.Active {
		fmt.Printf("! %v\n", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверное имя пользователя или пароль!!"})
		return
	}

	// Если пользователь найден, сохраняем ID сессии в cookie.
	session := sessions.Default(c)
	session.Set("user_id", employee.Id)
	err = session.Save()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "Не удалось сохранить сессию",
		})
		return
	}
	fmt.Printf("%+v\n", employee)
	c.JSON(http.StatusOK, gin.H{
		"id":    employee.Id,
		"name":  employee.Name,
		"email": employee.Email,
		"phone": employee.Phone,
		"photo": employee.Photo.String,
		"about": employee.About,
		"role":  employee.RoleId,
	})
}

func LogoutHandler(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	err := session.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка выхода из системы"})
		return
	}

	c.SetCookie("user_id", "", -1, "/", "", false, true)
	c.Redirect(http.StatusFound, "/")
}
