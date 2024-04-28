package middlewares

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)
func AuthMiddleWare(c *fiber.Ctx) error {
	var access_token string
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}
	fields := strings.Fields(authHeader)
	if len(fields) != 0 && fields[0] == "Bearer" {
		access_token = fields[1]
		print(access_token)
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}
	if access_token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}
	return c.Next()
}