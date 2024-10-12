package routes

import (
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	router := app.Group("/user")
	router.Get("/", AuthMiddleWare, GetUserProfile)
	router.Get("/:id", AuthMiddleWare, GetUserById)
}
