package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares" 

	"github.com/gofiber/fiber/v2"
)

func CredentialsRoutes(router fiber.Router) {
	router.Get("/credentials", middlewares.AuthMiddleWare, controllers.GetCredentials)
}
