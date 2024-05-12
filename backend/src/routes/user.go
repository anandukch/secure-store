package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	router := app.Group("/user")
	router.Get("/", middlewares.AuthMiddleWare, controllers.GetUserProfile)
}
