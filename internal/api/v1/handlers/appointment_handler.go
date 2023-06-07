package handlers

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func AcceptAppointmentHandler(c *gin.Context, app *app.App) {
	var clientData struct {
		Id              int
		ClientName      string `json:"client_name"`
		ClientPhone     string `json:"client_phone" `
		ClientEmail     string `json:"client_email"`
		AppointmentTime string `json:"send"`
		ServiceId       int    `json:"service_id,omitempty"  `
		EmployeeId      int    `json:"employee_select" `
		TimeSlot        string `json:"timeslot_select"`
	}

	if err := c.ShouldBindJSON(&clientData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Структура не соответствует"})
		return
	}
	data, err := time.Parse("2006-01-02 15:04", clientData.AppointmentTime+" "+clientData.TimeSlot)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Неверная дата"})
		return
	}
	appointment := models.Appointment{}
	appointment.ClientName = clientData.ClientName
	appointment.ClientPhone = clientData.ClientPhone
	appointment.AppointmentTime = data
	appointment.ServiceId = clientData.ServiceId
	appointment.EmployeeId = clientData.EmployeeId
	appointment.ClientEmail = clientData.ClientEmail
	appointment.IsOpen = true
	service := services.NewAppointmentService(app.DB, &appointment)
	schedule := app.Cache.Schedule()
	year, month, day := data.Date()
	sprintf := ""
	if month < 10 {
		if day < 10 {
			sprintf = fmt.Sprintf("%d-0%d-0%d %s", year, month, day, clientData.TimeSlot)
		} else {
			sprintf = fmt.Sprintf("%d-0%d-%d %s", year, month, day, clientData.TimeSlot)
		}
	} else {
		if day < 10 {
			sprintf = fmt.Sprintf("%d-%d-0%d %s", year, month, day, clientData.TimeSlot)
		} else {
			sprintf = fmt.Sprintf("%d-%d-%d %s", year, month, day, clientData.TimeSlot)
		}
	}
	timeSlot, err := time.Parse("2006-01-02 15:04", sprintf)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера timeslot"})
		return
	}

	err = service.RecordAppointment(
		schedule.Open,
		schedule.Close,
		schedule.HaircutInterval,
		timeSlot,
	)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}

	// Отправка почты
	employeeService := services.NewEmployeeService(app.DB, &models.Employee{})
	employee, err := employeeService.GetEmployeeById(context.Background(), clientData.EmployeeId)
	if err != nil {
		return
	}

	port, err := strconv.Atoi(app.Config.SMTPPort)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}

	mailer := services.NewMailer(app.Config.SMTPUser, app.Config.SMTPPass,
		app.Config.SMTPHost, port, app.Config.SMTPUser, employee.Email,
		services.ClientData{
			ClientName:  clientData.ClientName,
			ClientPhone: clientData.ClientPhone,
			ClientEmail: clientData.ClientEmail,
			Date:        clientData.AppointmentTime,
			Time:        clientData.TimeSlot,
		})

	err = mailer.Send()
	if err != nil {
		fmt.Printf("%v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Не удалось отправить"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Запись успешно добавлена"})
}

func GetOpenAppointmentsByIDHandler(c *gin.Context, app *app.App) {
	service := services.NewAppointmentService(app.DB, &models.Appointment{})
	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}
	appointments, err := service.GetAppointmentsById(id, true)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}
	c.JSON(http.StatusOK, appointments)
}

func CancelAppointmentByIDHandler(c *gin.Context, app *app.App) {
	service := services.NewAppointmentService(app.DB, &models.Appointment{})
	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}

	var clientData struct {
		ID       int    `json:"ID"`
		Date     string `json:"date"`
		TimeSlot string `json:"time_slot"`
	}

	if err := c.ShouldBindJSON(&clientData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Структура не соответствует"})
		return
	}

	err := service.CancelAppointmentsById(clientData.ID, id, clientData.Date, clientData.TimeSlot)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Запись успешно отменена"})
}

func CloseAppointmentByIDHandler(c *gin.Context, app *app.App) {
	service := services.NewAppointmentService(app.DB, &models.Appointment{})

	var clientData struct {
		ID       int    `json:"ID"`
		Date     string `json:"date"`
		TimeSlot string `json:"time_slot"`
	}

	if err := c.ShouldBindJSON(&clientData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Структура не соответствует"})
		return
	}

	err := service.CloseAppointmentsById(clientData.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Запись успешно Закрыта"})
}

func GetCloseAppointmentsByIDHandler(c *gin.Context, app *app.App) {
	service := services.NewAppointmentService(app.DB, &models.Appointment{})
	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}
	appointments, err := service.GetAppointmentsById(id, false)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}
	c.JSON(http.StatusOK, appointments)
}
