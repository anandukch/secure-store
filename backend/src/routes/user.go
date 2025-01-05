package routes

import (
	"pass-saver/src/handlers"
	"pass-saver/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

type UserRouter struct {
	Handler        *handlers.UserHandler
	AuthMiddleware middlewares.AuthMiddleWare
}

func (ur *UserRouter) Register(app fiber.Router) {
	router := app.Group("/users")
	router.Use(func(c *fiber.Ctx) error {
		c.Set("Content-Type", "application/json")
		return c.Next()
	})
	// router.Get("/profile", ur.AuthMiddleware.Middleware, ur.Handler.GetUserProfile)
	router.Post("/attributes", ur.Handler.GetUserByEmail)
	router.Get("/:id", ur.Handler.GetUserById)
}
