package controllers

import (
	"context"
	"net/http"
	"pass-saver/src/models"
	 "pass-saver/src/response"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUserProfile(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	userId := c.Params("id")
	var user models.User
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(userId)

	err := userCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&user)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(response.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	// return resposnes.BaseResponse(c, http.StatusOK, "User found", user)
	// return c.Status(http.StatusOK).JSON(resposnes.UserResponse{Status: http.StatusOK, Message: "User found", Data: &fiber.Map{"data": user}})
	return response.BaseResponse(c, http.StatusOK, "User found", user)
}
