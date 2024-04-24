package routes

import (
	"pass-saver/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(router fiber.Router) {
	router.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Route")
	})

	router.Post("/signup", controllers.CreateUser)
}
