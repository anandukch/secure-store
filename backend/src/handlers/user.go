package handlers

import (
	"net/http"

	"github.com/anandukch/secure-store/src/common"
	"github.com/anandukch/secure-store/src/pkg/models"
	"github.com/anandukch/secure-store/src/pkg/response"
	"github.com/anandukch/secure-store/src/pkg/schemas"
	"github.com/anandukch/secure-store/src/service"

	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	UserService *service.UserService
}

func (uc *UserHandler) GetAllUsers(c *fiber.Ctx) error {
	users, err := uc.UserService.GetAllUsers(c)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", nil)
	}

	return response.JSONResponse(c, http.StatusOK, "success", users)

}
func (uc *UserHandler) GetUserProfile(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)

	return response.JSONResponse(c, http.StatusOK, "success", response.FilteredResponse(user))
}

func (uc *UserHandler) GetUserById(c *fiber.Ctx) error {
	id, idErr := common.ToObjectID(c.Params("id"))
	if idErr != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "error", idErr.Error())
	}
	var user *models.User

	user, err := uc.UserService.GetUserById(c.Context(), id)
	if err != nil {
		return response.JSONResponse(c, http.StatusNotFound, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "success", response.FilteredResponse(*user))
}

// func (ac *UserHandler) CreateUser(c *fiber.Ctx) error {
// 	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	var user schemas.CreateUser
// 	// defer cancel()

// 	if err := c.BodyParser(&user); err != nil {
// 		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
// 			"error": err.Error(),
// 		})
// 	}

// 	if validationErr := validate.Struct(&user); validationErr != nil {
// 		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
// 			"error": validationErr.Error(),
// 		})
// 	}
// 	// encrypted_password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
// 	// if err != nil {
// 	// 	return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
// 	// }
// 	newUser := models.User{
// 		Id:       primitive.NewObjectID(),
// 		Name:     user.Name,
// 		Email:    user.Email,
// 	}

// 	result, err := ac.UserService.CreateUser(c, newUser)
// 	if err != nil {
// 		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
// 	}

// 	return response.JSONResponse(c, http.StatusCreated, "User created successfully", result)
// }

// func (uc *UserHandler) GetAllUsers(c *fiber.Ctx) error {
// 	users, err := uc.UserService.GetAllUsers(c)
// 	if err != nil {
// 		return response.JSONResponse(c, http.StatusInternalServerError, "error", nil)
// 	}

// 	return response.JSONResponse(c, http.StatusOK, "success", users)

// }

func (uc *UserHandler) GetUserByEmail(c *fiber.Ctx) error {
	var request *schemas.UserEmail

	if err := c.BodyParser(&request); err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
			"error": err.Error(),
		})
	}

	user, err := uc.UserService.GetUserByEmail(c.Context(), request.Email)
	if err != nil {
		return response.JSONResponse(c, http.StatusNotFound, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "success", *user)

}
