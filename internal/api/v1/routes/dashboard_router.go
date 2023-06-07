package routes

import (
	"net/http"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/handlers"
	"github.com/RemezovaJulia/creativehair/internal/api/v1/middleware"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/gin-gonic/gin"
)

func RegisterDashboardRoutes(app *app.App) {
	dashboardRoutes := app.Router.Group("/")
	dashboardRoutes.Use(middleware.RedirectUnauthorized(app.DB))
	dashboardRoutes.GET("/dashboard", func(c *gin.Context) {
		c.HTML(http.StatusOK, "dashboard.gohtml", gin.H{
			"title": "Dashboard",
		})
	})
	dashboardRoutes.GET("/logout", handlers.LogoutHandler)
	dashboardRoutes.POST("/dashboard/compare-old-password", func(c *gin.Context) {
		handlers.CompareOldPasswordHandler(c, app)
	})
	dashboardRoutes.POST("/dashboard/upload-avatar", func(c *gin.Context) {
		handlers.UploadAvatarHandler(c, app)
	})
	dashboardRoutes.PUT("/dashboard/change-user-data", func(c *gin.Context) {
		handlers.ChangeUserDataHandler(c, app)
	})
	dashboardRoutes.GET("/dashboard/schedule", func(c *gin.Context) {
		handlers.GetWorkScheduleHandler(c, app)
	})
	dashboardRoutes.PUT("/dashboard/schedule", func(c *gin.Context) {
		handlers.UpdateWorkScheduleHandler(c, app)
	})
	dashboardRoutes.GET("dashboard/get-gallery", func(c *gin.Context) {
		handlers.GetUserGallery(c, app)
	})
	dashboardRoutes.POST("dashboard/add-photos", func(c *gin.Context) {
		handlers.AddPhotosGallery(c, app)
	})
	dashboardRoutes.POST("dashboard/remove-photo", func(c *gin.Context) {
		handlers.RemovePhoto(c, app)
	})
	dashboardRoutes.GET("dashboard/get-open-appointments", func(c *gin.Context) {
		handlers.GetOpenAppointmentsByIDHandler(c, app)
	})
	dashboardRoutes.POST("dashboard/cancel-appointment", func(c *gin.Context) {
		handlers.CancelAppointmentByIDHandler(c, app)
	})
	dashboardRoutes.POST("dashboard/close-appointment", func(c *gin.Context) {
		handlers.CloseAppointmentByIDHandler(c, app)
	})
	dashboardRoutes.GET("dashboard/get-close-appointments", func(c *gin.Context) {
		handlers.GetCloseAppointmentsByIDHandler(c, app)
	})

	dashboardRoutes.POST("dashboard/has-login", func(c *gin.Context) {
		handlers.HasLoginHandler(c, app)
	})
	dashboardRoutes.POST("dashboard/create-user", func(c *gin.Context) {
		handlers.CreateUserHandler(c, app)
	})
	dashboardRoutes.GET("dashboard/get-all-users", func(c *gin.Context) {
		handlers.GetAllUsers(c, app)
	})
	dashboardRoutes.POST("dashboard/user-fried", func(c *gin.Context) {
		handlers.FriedUser(c, app)
	})

	dashboardRoutes.POST("dashboard/user-revert", func(c *gin.Context) {
		handlers.RevertUser(c, app)
	})
}
