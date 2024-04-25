package routes

import (
	"pass-saver/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func CredentialsRoutes(router fiber.Router) {
	router.Get("/credentials", controllers.GetCredentials)
}