package main

import (
	"os"
	"pass-saver/src/config"
	"pass-saver/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders:     "Content-Type,Authorization",
	}))
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
	routes.AuthRoutes(api)
	routes.UserRoutes(api)
	routes.CredentialsRoutes(api)

	app.Listen(":3000")
}
