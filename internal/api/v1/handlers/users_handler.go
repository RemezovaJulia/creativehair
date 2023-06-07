package handlers

import (
	"net/http"
	"strconv"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/gin-gonic/gin"
)

func UserInfoHandler(c *gin.Context, app *app.App) {
	employees := app.Cache.Employees()
	var employee *models.Employee
	for _, emp := range employees {
		if strconv.Itoa(emp.Id) == c.Param("id") {
			employee = emp
			break
		}
	}
	c.HTML(http.StatusOK, "user.gohtml", gin.H{"employee": employee})
}
