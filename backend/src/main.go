package main

import (
	"os"
	"pass-saver/src/common"
	"pass-saver/src/config"
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"
	"pass-saver/src/routes"
	"pass-saver/src/service"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.mongodb.org/mongo-driver/mongo"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders:     "Content-Type,Authorization",
	}))
	os.Setenv("FIBER_PREFORK", "1")
	var DB *mongo.Client = config.ConnectDB()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	})
	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "ok", "message": "healthcheck is ok"})
	})

	userService := &service.UserService{
		Model: config.GetCollection(DB, common.UserModel),
	}

	vaultService := &service.VaultService{
		Model: config.GetCollection(DB, common.VaultModel),
	}

	vaultController := controllers.VaultController{
		VaultService: vaultService,
	}
	userController := controllers.UserController{
		UserService: userService,
	}

	authController := controllers.AuthController{
		UserService: userService,
	}

	authMiddleware := middlewares.AuthMiddleWare{
		UserService: userService,
	}

	api := app.Group("/api")
	routes.AuthRoutes(api, authController)
	routes.UserRoutes(api, userController, authMiddleware)
	routes.VaultRoutes(api, vaultController, authMiddleware)

	app.Listen(":5000")
}
