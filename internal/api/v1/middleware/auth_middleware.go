package middleware

import (
	"context"
	"net/http"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SessionMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)

		if session.Get("session_id") == nil {
			session.Set("session_id", "")

			if err := session.Save(); err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
					"error": "Не удалось сохранить сессию",
				})
				return
			}
		}

		c.Set("session_id", session)
		c.Next()
	}
}

func RedirectAuthorized(db *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		userID := session.Get("user_id")
		id, ok := userID.(int)
		if ok {
			employeeService := services.NewEmployeeService(db, &models.Employee{})
			employee, err := employeeService.GetEmployeeById(context.Background(), id)
			if userID != nil && employee.Active && err == nil {
				c.Redirect(http.StatusFound, "/dashboard")
				c.Abort()
				return
			}
		}

		c.Next()
	}
}

func RedirectUnauthorized(db *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		userID := session.Get("user_id")

		employeeService := services.NewEmployeeService(db, &models.Employee{})
		id, ok := userID.(int)
		employee, err := employeeService.GetEmployeeById(context.Background(), id)
		if userID == nil || !ok || err != nil || !employee.Active {
			c.Redirect(http.StatusFound, "/auth")
			c.Abort()
			return
		}

		c.Next()
	}
}
