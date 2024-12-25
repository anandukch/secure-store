package routes

import (
	"pass-saver/src/handlers"

	"github.com/gofiber/fiber/v2"
)

type AuthRoute struct {
	Handler *handlers.AuthHandler
}

func (authRouter *AuthRoute) Register(app fiber.Router) {
	router := app.Group("/auth")
	router.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Route")
	})

	router.Post("/signup", authRouter.Handler.CreateUser)
	router.Post("/login", authRouter.Handler.SignIn)
}
