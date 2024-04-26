package middlewares

import "github.com/gofiber/fiber/v2"
func AuthMiddleWare(c *fiber.Ctx) error {
	var accessToken string
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}
	accessToken = authHeader
	print(accessToken)
	return c.Next()
}