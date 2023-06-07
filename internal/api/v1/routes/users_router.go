package routes

import (
	"github.com/RemezovaJulia/creativehair/internal/api/v1/handlers"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(app *app.App) {
	userRoutes := app.Router.Group("/")
	userRoutes.POST("/user/:id", func(c *gin.Context) {
		handlers.GetUserGalleryByIdHandler(c, app)
	})
	userRoutes.GET("/user/:id", func(c *gin.Context) {
		handlers.UserInfoHandler(c, app)
	})
}
