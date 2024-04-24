package main

import (
	"os"
	"pass-saver/src/config"
	"pass-saver/src/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	os.Setenv("FIBER_PREFORK", "1")
	config.ConnectDB()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	})
	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "ok", "message": "healthcheck is ok"})
	})

	// add an endpoint called /api do that other apis listed below will follow /api/user etc 
	api := app.Group("/api")
	routes.AuthRoutes(api.Group("/auth"))
	routes.UserRoutes(api.Group("/user"))

	app.Listen(":3000")
}
