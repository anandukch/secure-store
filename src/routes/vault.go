package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func CredentialsRoutes(app fiber.Router) {
	router := app.Group("/vault")
	router.Get("/", middlewares.AuthMiddleWare, controllers.GetCredentials)
}
