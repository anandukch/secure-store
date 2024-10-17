package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

type VaultRouter struct {
	VaultController *controllers.VaultController
	AuthMiddleware  middlewares.AuthMiddleWare
}

func (vr *VaultRouter) Register(app fiber.Router) {
	router := app.Group("/vault")
	router.Use(vr.AuthMiddleware.Middleware)
	router.Get("/", vr.VaultController.GetVault)
	router.Post("/", vr.VaultController.AddToVault)
}
