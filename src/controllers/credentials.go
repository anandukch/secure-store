package controllers

import "github.com/gofiber/fiber/v2"

func GetCredentials(c *fiber.Ctx) error {
	return c.SendString("GetCredentials")
}