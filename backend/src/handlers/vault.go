package handlers

import (
	"context"
	"fmt"
	"net/http"
	"pass-saver/src/pkg/models"
	"pass-saver/src/pkg/response"
	"pass-saver/src/pkg/schemas"
	"pass-saver/src/service"
	"time"

	"github.com/gofiber/fiber/v2"
)

type VaultHandler struct {
	VaultService *service.VaultService
	UserService  *service.UserService
}

func (ctrl *VaultHandler) GetVault(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var userVault *models.Vault
	userVault, err := ctrl.VaultService.GetByUserId(ctx, user.Id)

	if err != nil {
		return response.JSONResponse(c, http.StatusNotFound, "error", "Vault not found")
	}

	return response.JSONResponse(c, http.StatusOK, "success", userVault)
}

func (ctrl *VaultHandler) AddVault(c *fiber.Ctx) error {
	user := c.Locals("user").(*models.User)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var vault schemas.VaultRequest
	defer cancel()
	fmt.Printf("User: %v", vault)

	if err := c.BodyParser(&vault); err != nil {
		print(err)
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   err.Error(),
		})
	}

	if validationErr := validate.Struct(&vault); validationErr != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "error", validationErr.Error())
	}

	_, err := ctrl.VaultService.AddVault(ctx, user.Id, &vault)

	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "success", "Vault updated successfully")

}

func (ctrl *VaultHandler) GetAllVaults(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var userVaults []models.Vault
	userVaults, err := ctrl.VaultService.GetAllVaultByUserId(ctx, user.Id)

	if err != nil {
		return response.JSONResponse(c, http.StatusNotFound, "error", "Vault not found")
	}

	return response.JSONResponse(c, http.StatusOK, "success", userVaults)
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
