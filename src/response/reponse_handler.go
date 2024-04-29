package response

import "github.com/gofiber/fiber/v2"

// func Response(status int, message string, data interface{}) map[string]interface{} {
// 	return map[string]interface{}{
// 		"status":  status,
// 		"message": message,
// 		"data":    data,
// 	}
// }

func BaseResponse(c *fiber.Ctx,status int, message string, data interface{}) error {
	return c.Status(status).JSON(map[string]interface{}{
		"status":  status,
		"message": message,
		"data":    data,
	})
}

func Response(c *fiber.Ctx, status int, message string, data interface{}) error {
	return c.Status(status).JSON(&fiber.Map{
		"status":  status,
		"message": message,
		"data":    data,
	})
}
