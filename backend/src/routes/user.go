package routes

import (
	"pass-saver/src/config"
	"pass-saver/src/controllers"
	"pass-saver/src/repo"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	router := app.Group("/user")
	uc := &controllers.UserController{
		UserRepo: repo.CreateRepo(config.GetCollection("users")),
	}
	// router.Get("/", AuthMiddleWare, GetUserProfile)
	router.Get("/", uc.GetAllUsers)
	router.Get("/:id", uc.GetUserById)
	router.Post("/", uc.CreateUser)
}
