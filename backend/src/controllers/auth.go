package controllers

import (
	"context"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"pass-saver/src/handler"
	"pass-saver/src/models"
	"pass-saver/src/response"

	"pass-saver/src/schemas"
	"time"
)

var validate = validator.New()

func CreateUser(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var user schemas.UserRequest
	defer cancel()

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(response.UserResponse{
			Status:  http.StatusBadRequest,
			Message: "Invalid request",
			Data:    &fiber.Map{"data": err.Error()},
		})
	}

	if validationErr := validate.Struct(&user); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(response.UserResponse{
			Status:  http.StatusBadRequest,
			Message: "error",
			Data:    &fiber.Map{"data": validationErr.Error()},
		})
	}
	encrypted_password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(response.UserResponse{
			Status:  http.StatusInternalServerError,
			Message: "error",
			Data:    &fiber.Map{"data": err.Error()},
		})
	}
	newUser := models.User{
		Id:       primitive.NewObjectID(),
		Name:     user.Name,
		Email:    user.Email,
		Password: string(encrypted_password),
	}

	result, err := userCollection.InsertOne(ctx, newUser)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(response.UserResponse{
			Status:  http.StatusInternalServerError,
			Message: "error",
			Data:    &fiber.Map{"data": err.Error()},
		})
	}

	return c.Status(http.StatusCreated).JSON(response.UserResponse{
		Status:  http.StatusCreated,
		Message: "User created successfully",
		Data:    &fiber.Map{"data": result},
	})
}

func SignIn(c *fiber.Ctx) error {
	var request schemas.AuthRequest

	if err := c.BodyParser(&request); err != nil {
		return response.Response(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
			"error": err.Error(),
		})
	}

	if request.Email == "" || request.Password == "" {
		return response.BaseResponse(c, http.StatusBadRequest, "Invalid request", "Email and password are required")
	}

	var user models.User
	if err := userCollection.FindOne(context.Background(), bson.M{"email": request.Email}).Decode(&user); err != nil {
		return response.BaseResponse(c, http.StatusBadRequest, "Invalid request", "Invalid email")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)); err != nil {
		return response.BaseResponse(c, http.StatusBadRequest, "Invalid request", "Invalid password")
	}
	token, err := handler.GenerateJwtToken(user.Id.Hex(), user.Email)
	if err != nil {
		return response.BaseResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.Response(c, http.StatusOK, "User logged in", &fiber.Map{
		"token": token,
	})

}
