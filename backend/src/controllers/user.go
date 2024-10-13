package controllers

import (
	"net/http"
	"pass-saver/src/common"
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

	return response.JSONResponse(c, http.StatusOK, "success", response.FilteredResponse(user))
}

func (uc *UserController) GetUserById(c *fiber.Ctx) error {
	id, idErr := common.ToObjectID(c.Params("id"))
	if idErr != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "error", idErr.Error())
	}
	var user *models.User

	user, err := uc.UserRepo.GetUserById(c, id)
	if err != nil {
		return response.JSONResponse(c, http.StatusNotFound, "error", err.Error())
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

	return response.JSONResponse(c, http.StatusCreated, "success", fiber.Map{
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
