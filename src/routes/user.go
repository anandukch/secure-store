package routes

import (
	"pass-saver/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	router := app.Group("/user")
	router.Get("/:id",controllers.GetUserProfile)
}
