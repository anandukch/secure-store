package response

import (
	"github.com/anandukch/secure-store/src/pkg/models"

	"github.com/gofiber/fiber/v2"
)

// type UserResponse struct {
// 	Status  int `json:"status"`
// 	Message string `json:"message"`
// 	Data    *fiber.Map `json:"data"`
// }

func FilteredResponse(user models.User) fiber.Map {
	return fiber.Map{
		"username": user.Name,
		"email":    user.Email,
	}
}
