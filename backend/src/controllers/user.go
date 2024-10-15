package controllers

import (
	"net/http"
	"pass-saver/src/common"
	"pass-saver/src/models"
	"pass-saver/src/repo"
	"pass-saver/src/response"
	"pass-saver/src/schemas"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
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

func (ac *UserController) CreateUser(c *fiber.Ctx) error {
	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var user schemas.CreateUser
	// defer cancel()

	if err := c.BodyParser(&user); err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
			"error": err.Error(),
		})
	}

	if validationErr := validate.Struct(&user); validationErr != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
			"error": validationErr.Error(),
		})
	}
	encrypted_password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}
	newUser := models.User{
		Id:       primitive.NewObjectID(),
		Name:     user.Name,
		Email:    user.Email,
		Password: string(encrypted_password),
	}

	result, err := ac.UserRepo.CreateUser(c, newUser)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusCreated, "User created successfully", result)
}

func (uc *UserController) GetAllUsers(c *fiber.Ctx) error {
	users, err := uc.UserRepo.GetAllUsers(c)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", nil)
	}

	return response.JSONResponse(c, http.StatusOK, "success", users)

}
