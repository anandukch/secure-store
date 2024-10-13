package middlewares

import (
	"context"
	"net/http"
	"pass-saver/src/config"
	"pass-saver/src/handler"
	"pass-saver/src/models"
	"pass-saver/src/response"
	"strings"
	"github.com/gofiber/fiber/v2"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	// "golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = config.GetCollection("users") 

func AuthMiddleWare(c *fiber.Ctx) error {
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
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized in extraction of claims"})
	}
	var user models.User
	objId, _ := primitive.ObjectIDFromHex(claims["id"].(string)) // Perform type assertion
	if err := userCollection.FindOne(context.Background(), bson.M{"_id": objId}).Decode(&user); err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", "Invalid credentials")
	}
	c.Locals("user", user)
	return c.Next()
}