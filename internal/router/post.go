package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaibhavm18/go-blind/internal/util"
)

func AddPostGroup(app *fiber.App) {
	postGroup := app.Group("/api/v1/post")
	postGroup.Use(util.VerifyUser)
	postGroup.Get("/", postCheck)
}

func postCheck(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
}
