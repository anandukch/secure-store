package routes

import (
	"github.com/anandukch/secure-store/src/handlers"
	"github.com/anandukch/secure-store/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

type VaultRouter struct {
	Handler        *handlers.VaultHandler
	AuthMiddleware middlewares.AuthMiddleWare
}

func (vr *VaultRouter) Register(app fiber.Router) {
	router := app.Group("/vaults")
	router.Use(vr.AuthMiddleware.Middleware)
	router.Post("/", vr.Handler.AddVault)
	router.Get("/", vr.Handler.GetAllVaults)
}
