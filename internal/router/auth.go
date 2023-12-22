package router

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/vaibhavm18/go-blind/internal/models"
)

func AddAuthGroup(app *fiber.App) {
	authGroup := app.Group("/api/v1/auth")
	authGroup.Get("/login", login)
	authGroup.Post("/signup", signup)
}

func login(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
}

func signup(c *fiber.Ctx) error {
	var newUser models.User

	if err := c.BodyParser(&newUser); err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Please send valid input",
		})
	}

	fmt.Println("hi")
	return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
}
