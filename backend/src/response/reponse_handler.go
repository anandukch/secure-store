package response

import "github.com/gofiber/fiber/v2"

type Response struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// func BaseResponse(c *fiber.Ctx,status int, message string, data interface{}) error {
// 	return c.Status(status).JSON(&fiber.Map{
// 		"status":  status,
// 		"message": message,
// 		"data":    data,
// 	})
// }

func JSONResponse(c *fiber.Ctx, status int, message string, data interface{}) error {
	resp := Response{
		Status:  status,
		Message: message,
		Data:    data,
	}

	// Set status and return the response as JSON
	return c.Status(status).JSON(resp)
}
