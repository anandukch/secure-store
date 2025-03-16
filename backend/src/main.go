package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/anandukch/secure-store/src/common"
	"github.com/anandukch/secure-store/src/config"
	"github.com/anandukch/secure-store/src/handlers"
	"github.com/anandukch/secure-store/src/middlewares"
	"github.com/anandukch/secure-store/src/routes"
	"github.com/anandukch/secure-store/src/service"
	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"go.mongodb.org/mongo-driver/mongo"
)

func main() {
	// Load environment variables
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Set up Fiber app
	app := fiber.New(fiber.Config{
		// Prefork: true,
	})

	// CORS middleware setup
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders:     "Content-Type,Authorization",
	}))

	// Logger middleware setup
	app.Use(logger.New(logger.Config{
		Format:     "${time} - ${ip} - ${method} ${path} ${status} - ${latency}\n",
		TimeFormat: "02-Jan-2006",
		TimeZone:   "Local",
	}))

	// Set environment variable for Fiber's Prefork
	os.Setenv("FIBER_PREFORK", "1")

	// Connect to MongoDB
	var DB *mongo.Client = config.ConnectDB()
	if DB == nil {
		log.Fatal("Failed to connect to MongoDB")
	}

	// Set up routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	})
	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "ok", "message": "healthcheck is ok"})
	})

	// Initialize services
	userService := &service.UserService{
		Model:    config.GetCollection(DB, common.UserModel),
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
		Handler:        authController,
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

	// Set the PORT or default to 5050
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5050"
	}

	// Graceful shutdown handling
	go func() {
		if err := app.Listen(":" + PORT); err != nil {
			log.Fatal(err)
		}
	}()

	// Wait for an interrupt signal to gracefully shut down the server
	c := make(chan os.Signal, 1)
	signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
	<-c

	// Perform graceful shutdown
	log.Println("Shutting down server...")
	if err := app.Shutdown(); err != nil {
		log.Fatal("Error shutting down server: ", err)
	}
	log.Println("Server shut down successfully")
}
