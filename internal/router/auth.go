package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaibhavm18/go-blind/internal/models"
)

var users []models.User

func AddAuthGroup(app *fiber.App) {
	authGroup := app.Group("/api/v1/auth")
	authGroup.Post("/login", login)
	authGroup.Post("/signup", signup)
}

func login(c *fiber.Ctx) error {
	var newUser models.User

	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	res, err := models.GetUserByUsername(newUser)

	if err != nil {
		return c.Status(403).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}

	res.Password = ""

	return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!", "user": res})
}

func signup(c *fiber.Ctx) error {
	var newUser models.User

	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	res, err := models.CreateUser(newUser)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "User Created successfully.",
		"user":    res,
	})
}
