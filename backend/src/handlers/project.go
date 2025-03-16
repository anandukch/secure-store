package handlers

import (
	"github.com/anandukch/secure-store/src/pkg/models"
	"github.com/anandukch/secure-store/src/pkg/schemas"
	"github.com/anandukch/secure-store/src/service"

	"github.com/gofiber/fiber/v2"
)

type ProjectHandler struct {
	ProjectService *service.ProjectService
}

func (p *ProjectHandler) CreateProject(c *fiber.Ctx) error {
	user := c.Locals("user").(*models.User)

	var projectRequest schemas.ProjectRequest

	if err := c.BodyParser(&projectRequest); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
			"error":   err.Error(),
		})
	}

	project, err := p.ProjectService.CreateProject(c.Context(), user.Id, &projectRequest)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "error",
			"error":   err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "Project created successfully",
		"data":    project,
	})
}
