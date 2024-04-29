package controllers

import (
	"context"
	"errors"
	"net/http"
	"pass-saver/src/config"
	"pass-saver/src/models"
	"pass-saver/src/response"
	"pass-saver/src/schemas"
	"pass-saver/src/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

var vaultCollection *mongo.Collection = config.GetCollection("vault")

func GetVault(c *fiber.Ctx) error {
	return c.SendString("GetCredentials")
}

func AddToVault(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var vault schemas.VaultSchema
	defer cancel()

	if err := c.BodyParser(&vault); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   err.Error(),
		})
	}

	if validationErr := validate.Struct(&vault); validationErr != nil {
		return response.Response(c, http.StatusBadRequest, "error", validationErr.Error())
	}

	if err := validateType(&vault); err != nil {
		return response.Response(c, http.StatusBadRequest, "error", err.Error())
	}

	newVault := models.Vault{
		UserId: user.Id,
		Type:   vault.Type,
		Data:   vault.Data,
	}

	result, err := vaultCollection.InsertOne(ctx, newVault)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "error",
			"error":   err.Error(),
		})
	}

	return response.Response(c, http.StatusOK, "success", result.InsertedID)

}


func validateType(vault *schemas.VaultSchema) error {
	validTypes := []utils.CredType{utils.Password}

	for _, t := range validTypes {
		if vault.Type == t {
			return nil
		}
	}

	return errors.New("invalid value in type field") // Type is not valid
}
