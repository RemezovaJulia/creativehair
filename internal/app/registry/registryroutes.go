package registry

import (
	"net/http"
	"time"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/middleware"
	"github.com/RemezovaJulia/creativehair/internal/api/v1/routes"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

func RegisterRoutes(app *app.App) {
	app.Router.LoadHTMLGlob("./internal/templates/*")
	app.Router.StaticFS("/public", http.Dir("internal/public"))
	store := cookie.NewStore([]byte("secret"))
	store.Options(sessions.Options{
		Path:     "/",
		Domain:   "",
		MaxAge:   int(31 * 24 * time.Hour),
		Secure:   false,
		HttpOnly: true,
	})

	app.Router.Use(sessions.Sessions("session_id", store))
	app.Router.Use(middleware.SessionMiddleware())

	routes.RegisterAuthRoutes(app)
	routes.RegisterDashboardRoutes(app)
	routes.RegisterHomeRoutes(app)
	routes.RegisterUserRoutes(app)
}
