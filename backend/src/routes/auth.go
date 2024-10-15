package routes

import (
	"github.com/gofiber/fiber/v2"
	"pass-saver/src/controllers"
)

type AuthRoute struct {
	AuthController controllers.AuthController
}

func AuthRoutes(app fiber.Router, controller controllers.AuthController) {
	router := app.Group("/auth")
	router.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Route")
	})

	router.Post("/signup", controller.CreateUser)
	router.Post("/login", controller.SignIn)
}
