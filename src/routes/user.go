package routes

import (
	"pass-saver/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	app.Post("/api/user",controllers.CreateUser)
}
