package routes

import (
	"net/http"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/handlers"
	"github.com/RemezovaJulia/creativehair/internal/api/v1/middleware"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(app *app.App) {
	// Не авторизованные маршруты.
	unAuthRoutes := app.Router.Group("/auth")
	unAuthRoutes.Use(middleware.RedirectAuthorized(app.DB))
	{
		unAuthRoutes.GET("", func(c *gin.Context) {
			c.HTML(http.StatusOK, "auth.gohtml", gin.H{})
		})
		unAuthRoutes.POST("/login", func(c *gin.Context) {
			handlers.LoginHandler(c, app)
		})
	}

}
