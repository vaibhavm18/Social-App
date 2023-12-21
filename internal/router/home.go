package router

import "github.com/gofiber/fiber/v2"

func AddHomeGroup(app *fiber.App) {
	homeGroup := app.Group("/")
	homeGroup.Get("/health", checkHealth)
}

func checkHealth(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
}
