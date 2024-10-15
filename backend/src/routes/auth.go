package routes

import (
	"pass-saver/src/config"
	"pass-saver/src/controllers"
	"pass-saver/src/repo"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app fiber.Router) {
	router := app.Group("/auth")

	userRepo := &repo.UserRepository{
		Model: config.GetCollection(USERS),
	}
	
	authController := controllers.AuthController{
		UserRepo: userRepo,
	}

	router.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Route")
	})

	router.Post("/signup", authController.CreateUser)
	router.Post("/login", SignIn)
}
