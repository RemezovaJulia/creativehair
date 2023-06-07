package routes

import (
	"github.com/RemezovaJulia/creativehair/internal/api/v1/handlers"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/gin-gonic/gin"
)

func RegisterHomeRoutes(app *app.App) {
	homeRoutes := app.Router.Group("/")
	homeRoutes.GET("/", func(c *gin.Context) {
		handlers.HomeHandler(c, app)
	})
	homeRoutes.GET("/get-calendar", func(c *gin.Context) {
		handlers.GetCalendarHandler(c, app)
	})
	homeRoutes.POST("/get-timeslot", func(c *gin.Context) {
		handlers.GetTimeSlotsHandler(c, app)
	})
	homeRoutes.POST("/accept-appointment", func(c *gin.Context) {
		handlers.AcceptAppointmentHandler(c, app)
	})
	homeRoutes.GET("/get-gallery", func(c *gin.Context) {
		handlers.GetGalleryHandler(c, app)
	})
}
