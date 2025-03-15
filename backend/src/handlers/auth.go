package handlers

import (
	"fmt"
	"net/http"
	"pass-saver/src/handler"
	"pass-saver/src/pkg/models"
	"pass-saver/src/pkg/response"
	"pass-saver/src/pkg/schemas"
	"pass-saver/src/pkg/utils"
	"pass-saver/src/service"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
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

	_, err := ac.UserService.CreateUser(c, &user)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	otp, err := utils.SendOtp(user.Email)

	_, err = ac.UserService.AddOtp(c, user.Email, otp)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "OTP sent successfully", &fiber.Map{
		"email": user.Email,
	})
	// token, err := handler.GenerateJwtToken(user.Email)
	// if err != nil {
	// 	return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	// }

	// return response.JSONResponse(c, http.StatusCreated, "User created successfully", token)
}

func (ctrl *AuthHandler) SignIn(c *fiber.Ctx) error {
	var request schemas.AuthRequest

	if err := c.BodyParser(&request); err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
			"error": err.Error(),
		})
	}

	var user *models.User
	user, err := ctrl.UserService.GetUserByEmail(c.Context(), request.Email)
	if err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", "Invalid email")
	}

	if user.IsVerified == false {
		_, err := ctrl.UserService.DeleteOtp(c, request.Email)

		otp, err := utils.SendOtp(user.Email)

		_, err = ctrl.UserService.AddOtp(c, user.Email, otp)
		if err != nil {
			return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
		}
		return response.JSONResponse(c, fiber.StatusUnauthorized, "Invalid request", "User not verified")
	}

	// err = utils.SendOtp(user.Email)
	// if err != nil {
	// 	return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	// }

	// return response.JSONResponse(c, http.StatusOK, "OTP sent successfully", &fiber.Map{
	// 	"email": user.Email,
	// })

	token, err := handler.GenerateJwtToken(user.Email)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "User logged in", &fiber.Map{
		"token": token,
	})

}

func (ctrl *AuthHandler) VerifyUser(c *fiber.Ctx) error {

	var request schemas.VerifyUserRequest
	fmt.Println(request)
	if err := c.BodyParser(&request); err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", &fiber.Map{
			"error": err.Error(),
		})
	}
	fmt.Println(request.Otp)

	otp, otpErr := ctrl.UserService.GetOtp(c, request.Otp)
	if otpErr != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", "Invalid OTP")
	}

	var user *models.User
	user, err := ctrl.UserService.GetUserByEmail(c.Context(), otp.Email)
	if err != nil {
		return response.JSONResponse(c, http.StatusBadRequest, "Invalid request", "Invalid email")
	}

	user.IsVerified = true
	_, updatedErr := ctrl.UserService.UpdateUser(c, user.Id, *user)
	if updatedErr != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", updatedErr.Error())
	}
	token, err := handler.GenerateJwtToken(user.Email)
	if err != nil {
		return response.JSONResponse(c, http.StatusInternalServerError, "error", err.Error())
	}

	return response.JSONResponse(c, http.StatusOK, "User logged in", &fiber.Map{
		"token": token,
	})

}

func (ctrl *AuthHandler) VerifyToken(c *fiber.Ctx) error {

	return response.JSONResponse(c, http.StatusOK, "success", "User verified successfully")

}
