package routes

import (
	"pass-saver/src/config"
	"pass-saver/src/controllers"
	"pass-saver/src/repo"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	router := app.Group("/user")
	userRepo := &repo.UserRepository{
		Model: config.GetCollection(USERS),
	}
	userController := controllers.UserController{
		UserRepo: userRepo,
	}
	router.Get("/profile", AuthMiddleWare, userController.GetUserProfile)
	router.Get("/", userController.GetAllUsers)
	router.Get("/:id", userController.GetUserById)
	router.Post("/", userController.CreateUser)
}
