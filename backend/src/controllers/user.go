package controllers

import (
	"net/http"
	"pass-saver/src/models"
	"pass-saver/src/response"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetUserProfile(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)

	return c.JSON(response.UserResponse{
		Status:  http.StatusOK,
		Message: "success",
		Data:    response.FilteredResponse(user),
	})
}

func GetUserById(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	if err := userCollection.FindOne(c.Context(), bson.M{"_id": id}).Decode(&user); err != nil {
		return c.Status(http.StatusNotFound).JSON(response.UserResponse{
			Status:  http.StatusNotFound,
			Message: "error",
			Data:    &fiber.Map{"data": err.Error()},
		})
	}

	return response.BaseResponse(c, http.StatusOK, "success", response.FilteredResponse(user))
}
