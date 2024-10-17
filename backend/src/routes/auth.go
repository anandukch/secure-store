package routes

import (
	"github.com/gofiber/fiber/v2"
	"pass-saver/src/controllers"
)

type AuthRoute struct {
	AuthController *controllers.AuthController
}

func (authRouter *AuthRoute) Register(app fiber.Router) {
	router := app.Group("/auth")
	router.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Route")
	})

	router.Post("/signup", authRouter.AuthController.CreateUser)
	router.Post("/login", authRouter.AuthController.SignIn)
}
