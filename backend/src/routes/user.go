package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

type UserRoute struct {
	UserController controllers.UserController
}

func UserRoutes(app fiber.Router, controller controllers.UserController,authMiddleware middlewares.AuthMiddleWare) {
	router := app.Group("/user")
	router.Use(func(c *fiber.Ctx) error {
		c.Set("Content-Type", "application/json")
		return c.Next()
	})
	router.Get("/profile", authMiddleware.Middleware, controller.GetUserProfile)
	router.Get("/", controller.GetAllUsers)
	router.Get("/:id", controller.GetUserById)
	router.Post("/", controller.CreateUser)
}
