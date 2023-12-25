package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaibhavm18/go-blind/internal/util"
)

func AddAuthGroup(app *fiber.App) {
	roup := app.Group("/api/v1/auth")
	roup.Get("/", authenticate)
	roup.Get("/health", checkHealth)
	roup.Post("/login", login)
	roup.Post("/signup", signup)
}

func checkHealth(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
}

func login(c *fiber.Ctx) error {
	var newUser User

	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	res, err := GetUserByUsername(newUser)

	if err != nil {
		return c.Status(403).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}

	res.Password = ""

	token, err := util.GenerateJwt(res.Id.String(), res.Username)

	if err != nil {
		return c.Status(403).JSON(fiber.Map{
			"errorMessage": "User created successfully, please login",
		})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    token,
		HTTPOnly: true,
		Secure:   true,
	})

	return c.Status(200).JSON(fiber.Map{
		"message": "Hello, World 👋!",
		"user":    res,
		"token":   token,
	})
}

func signup(c *fiber.Ctx) error {
	var newUser User

	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	res, err := CreateUser(newUser)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}

	token, err := util.GenerateJwt(res.Id.String(), res.Username)

	if err != nil {
		return c.Status(403).JSON(fiber.Map{
			"errorMessage": "User created successfully, please login",
		})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    token,
		HTTPOnly: true,
		Secure:   true,
	})

	return c.Status(200).JSON(fiber.Map{
		"message": "User Created successfully.",
		"user":    res,
		"token":   token,
	})
}

func authenticate(c *fiber.Ctx) error {
	token := c.Cookies("access_token")

	if token == "" {
		token = c.Get("Authorization")
		if token == "" {
			return c.Status(404).JSON(fiber.Map{
				"message": "please login",
			})
		}
	}

	username, err := util.DecodeJwt(token)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "please login",
		})
	}

	res, err := GetUserById(username)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "please login",
		})
	}

	res.Password = ""

	return c.Status(200).JSON(fiber.Map{
		"message": "User loged in.",
		"user":    res,
		"token":   token,
	})
}
