package controllers

import (
	"context"
	"net/http"
	"pass-saver/src/config"
	"pass-saver/src/models"
	"pass-saver/src/resposnes"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = config.GetCollection("users")

var validate = validator.New()

func CreateUser(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(),10*time.Second)
	var user models.User
	defer cancel()

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(resposnes.UserResponse{
			Status: http.StatusBadRequest,
			Message: "Invalid request",
			Data: &fiber.Map{"data":err.Error()},
		})
	}

	if validationErr := validate.Struct(&user); validationErr != nil{
		return c.Status(http.StatusBadRequest).JSON(resposnes.UserResponse{
			Status: http.StatusBadRequest,
			Message: "error",
			Data: &fiber.Map{"data":validationErr.Error()},
		})
	}

	newUser := models.User{
		Id : primitive.NewObjectID(),
		Name: user.Name,
	}

	result,err := userCollection.InsertOne(ctx,newUser)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(resposnes.UserResponse{
			Status: http.StatusInternalServerError,
			Message: "error",
			Data: &fiber.Map{"data":err.Error()},
		})
	}

	return c.Status(http.StatusCreated).JSON(resposnes.UserResponse{
		Status: http.StatusCreated,
		Message: "User created successfully",
		Data: &fiber.Map{"data":result},
	})
}