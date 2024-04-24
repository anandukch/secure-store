package routes

import (
	"pass-saver/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(router fiber.Router) {
	router.Get("/:id",controllers.GetUserProfile)
}
