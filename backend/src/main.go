package main

import (
	"os"
	"pass-saver/src/common"
	"pass-saver/src/config"
	"pass-saver/src/handlers"
	"pass-saver/src/middlewares"
	"pass-saver/src/routes"
	"pass-saver/src/service"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"go.mongodb.org/mongo-driver/mongo"
)

func main() {
	app := fiber.New(fiber.Config{
		// Prefork: 	 true,
	})

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders:     "Content-Type,Authorization",
	}))

	app.Use(logger.New(logger.Config{
		Format:     "${time} - ${ip} - ${method} ${path} ${status} - ${latency}\n",
		TimeFormat: "02-Jan-2006",
		TimeZone:   "Local",
	}))

	os.Setenv("FIBER_PREFORK", "1")
	var DB *mongo.Client = config.ConnectDB()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	})
	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "ok", "message": "healthcheck is ok"})
	})

	// Initialize services

	userService := &service.UserService{
		Model: config.GetCollection(DB, common.UserModel),
		OtpModel: config.GetCollection(DB, common.OtpModel),
	}

	vaultService := &service.VaultService{
		Model: config.GetCollection(DB, common.VaultModel),
	}

	// Initialize controllers

	vaultController := &handlers.VaultHandler{
		VaultService: vaultService,
		UserService:  userService,
	}

	userController := &handlers.UserHandler{
		UserService: userService,
	}

	authController := &handlers.AuthHandler{
		UserService: userService,
	}

	// Initialize middlewares

	authMiddleware := middlewares.AuthMiddleWare{
		UserService: userService,
	}

	// Initialize routes

	authRouter := &routes.AuthRoute{
		Handler: authController,
		AuthMiddleware: &authMiddleware,
	}

	userRouter := &routes.UserRouter{
		Handler:        userController,
		AuthMiddleware: authMiddleware,
	}

	vaultRouter := &routes.VaultRouter{
		Handler:        vaultController,
		AuthMiddleware: authMiddleware,
	}

	api := app.Group("/api")
	authRouter.Register(api.Group("/auth"))
	userRouter.Register(api)
	vaultRouter.Register(api)
	print("Server is running on port 5050")
	if err := app.Listen(":5050"); err != nil {
		panic(err)
	}
}
