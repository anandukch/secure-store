package controllers

import (
	"net/http"
	"pass-saver/src/models"
	"pass-saver/src/repo"
	"pass-saver/src/response"

	"github.com/gofiber/fiber/v2"
)

type UserController struct {
	UserRepo *repo.UserRepository
}

func (uc *UserController) GetUserProfile(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)

	return c.JSON(response.UserResponse{
		Status:  http.StatusOK,
		Message: "success",
		Data:    response.FilteredResponse(user),
	})
}

func (uc *UserController) GetUserById(c *fiber.Ctx) error {
	id := c.Params("id")
	var user *models.User

	user, err := uc.UserRepo.GetUserById(c, id)
	if err != nil {
		return response.JSONResponse(c, http.StatusNotFound, "error", nil)
	}

	return response.JSONResponse(c, http.StatusOK, "success", response.FilteredResponse(*user))
}

func (uc *UserController) CreateUser(c *fiber.Ctx) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "error", nil)
	}

	if _, err := uc.UserRepo.CreateUser(c, user); err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", nil)
	}

	return response.JSONResponse(c, http.StatusCreated, "success", map[string]string{
		"message": "User created successfully",
	})
}

func (uc *UserController) GetAllUsers(c *fiber.Ctx) error {
	users, err := uc.UserRepo.GetAllUsers(c)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", nil)
	}

	return response.JSONResponse(c, http.StatusOK, "success", users)

}
