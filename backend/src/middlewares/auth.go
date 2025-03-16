package middlewares

import (
	"net/http"
	"strings"

	"github.com/anandukch/secure-store/src/handler"
	"github.com/anandukch/secure-store/src/pkg/response"
	"github.com/anandukch/secure-store/src/service"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	// "go.mongodb.org/mongo-driver/bson"
	// "golang.org/x/crypto/bcrypt"
)

type AuthMiddleWare struct {
	UserService *service.UserService
}

func (a *AuthMiddleWare) Middleware(c *fiber.Ctx) error {
	var access_token string
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}
	fields := strings.Fields(authHeader)
	if len(fields) != 0 && fields[0] == "Bearer" {
		access_token = fields[1]
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}
	if access_token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}
	claims, err := handler.ExtractClaims(access_token)
	if err != nil {
		log.Error(err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized in extraction of claims"})
	}

	// objId, _ := primitive.ObjectIDFromHex(claims["id"].(string)) // Perform type assertion
	user, err := a.UserService.GetUserByEmail(c.Context(), claims["email"].(string))
	if err != nil {
		log.Error(err)

		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", "Invalid credentials")
	}
	c.Locals("user", user)
	return c.Next()
}
