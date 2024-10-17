package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

type UserRouter struct {
	UserController controllers.UserController
	AuthMiddleware middlewares.AuthMiddleWare
}

func (ur *UserRouter) Register(app fiber.Router) {
	router := app.Group("/user")
	router.Use(func(c *fiber.Ctx) error {
		c.Set("Content-Type", "application/json")
		return c.Next()
	})
	router.Get("/profile", ur.AuthMiddleware.Middleware, ur.UserController.GetUserProfile)
	router.Get("/", ur.UserController.GetAllUsers)
	router.Get("/:id", ur.UserController.GetUserById)
	router.Post("/", ur.UserController.CreateUser)
}
