package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func VaultRoutes(app fiber.Router, controller controllers.VaultController, authMiddleware middlewares.AuthMiddleWare) {
	router := app.Group("/vault")
	router.Use(authMiddleware.Middleware)
	router.Get("/", controller.GetVault)
	router.Post("/", controller.AddToVault)
}
