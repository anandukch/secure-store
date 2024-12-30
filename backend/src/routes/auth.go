package routes

import (
	"pass-saver/src/handlers"

	"github.com/gofiber/fiber/v2"
)

type AuthRoute struct {
	Handler *handlers.AuthHandler
}

func (authRouter *AuthRoute) Register(router fiber.Router) {
	router.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Route")
	})

	router.Post("/signup", authRouter.Handler.CreateUser)
	router.Post("/login", authRouter.Handler.SignIn)
	router.Post("/send-otp", authRouter.Handler.SendOtp)
}
