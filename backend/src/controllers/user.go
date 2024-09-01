package controllers

import (

	"net/http"
	"pass-saver/src/models"
	 "pass-saver/src/response"
	"github.com/gofiber/fiber/v2"
)

func GetUserProfile(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)
	

	return c.JSON(response.UserResponse{
		Status:  http.StatusOK,
		Message: "success",
		Data:    response.FilteredResponse(&user),
	})
}
