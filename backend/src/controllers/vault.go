package controllers

import (
	"context"
	"net/http"
	"pass-saver/src/models"
	"pass-saver/src/response"
	"time" 
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)


func GetVault(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var userVault models.Vault
	err := vaultCollection.FindOne(ctx, bson.M{"userId": user.Id}).Decode(&userVault)

	if err != nil {
		return response.JSONResponse(c, http.StatusNotFound, "error", "Vault not found")
	}

	return response.JSONResponse(c, http.StatusOK, "success", userVault.Data)
}

func AddToVault(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var vault models.VaultData
	defer cancel()

	if err := c.BodyParser(&vault); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   err.Error(),
		})
	}

	if validationErr := validate.Struct(&vault); validationErr != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "error", validationErr.Error())
	}

	var userVault models.User
	err := vaultCollection.FindOne(ctx, bson.M{"userId": user.Id}).Decode(&userVault)

	if err != nil {
		newVault := models.Vault{
			UserId: user.Id,
			Data:   []models.VaultData{vault},
		}
	
		_, err = vaultCollection.InsertOne(ctx, newVault)

		if err != nil {
			return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
		}

		return response.JSONResponse(c, http.StatusOK, "success", "Vault created successfully")

	}

	_, err = vaultCollection.UpdateOne(ctx, bson.M{"userId": user.Id}, bson.M{"$push": bson.M{"data": vault}})

	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "success", "Vault updated successfully")

}


// func validateType(vault *schemas.VaultSchema) error {
// 	validTypes := []utils.VaultType{utils.Credentias}

// 	for _, t := range validTypes {
// 		if vault.Type == t {
// 			return nil
// 		}
// 	}

// 	return errors.New("invalid value in type field") // Type is not valid
// }
// var ErrInvalidRequest = errors.New("invalid request: Only one of Credentias, Card, or Personal is allowed")

// func validateVault(v *schemas.VaultSchema) error {
// 	if isEmpty(v.Credentias) && isEmpty(v.Card) && isEmpty(v.Personal) {
// 		return ErrInvalidRequest
// 	}

// 	count := 0
// 	if !isEmpty(v.Credentias) {
// 		count++
// 	}
// 	if !isEmpty(v.Card) {
// 		count++
// 	}
// 	if !isEmpty(v.Personal) {
// 		count++
// 	}

// 	if count != 1 {
// 		return ErrInvalidRequest
// 	}

// 	return nil
// }

// // Function to check if a struct is empty
// func isEmpty(s interface{}) bool {
// 	return reflect.DeepEqual(s, reflect.Zero(reflect.TypeOf(s)).Interface())
// }
