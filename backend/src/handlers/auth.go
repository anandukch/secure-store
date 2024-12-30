package handlers

import (
	"net/http"
	"pass-saver/src/handler"
	"pass-saver/src/pkg/models"
	"pass-saver/src/pkg/response"
	"pass-saver/src/pkg/schemas"
	"pass-saver/src/service"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthHandler struct {
	UserService *service.UserService
}

var validate = validator.New()

func (ac *AuthHandler) CreateUser(c *fiber.Ctx) error {
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
	newUser := models.User{
		Id:       primitive.NewObjectID(),
		Name:     user.Name,
		Email:    user.Email,
	}

	result, err := ac.UserService.CreateUser(c, newUser)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusCreated, "User created successfully", result)
}

func (ctrl *AuthHandler) SignIn(c *fiber.Ctx) error {
	var request schemas.AuthRequest

	if err := c.BodyParser(&request); err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
			"error": err.Error(),
		})
	}

	if request.Email == "" || request.Password == "" {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", "Email and password are required")
	}

	var user *models.User
	user, err := ctrl.UserService.GetUserByEmail(c.Context(), request.Email)
	if err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", "Invalid email")
	}

	token, err := handler.GenerateJwtToken(user.Id.Hex(), user.Email)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "User logged in", &fiber.Map{
		"token": token,
	})

}
