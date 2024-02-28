package util

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaibhavm18/go-blind/internal/model"
)

func VerifyUser(c *fiber.Ctx) error {
	token := c.Cookies("access_token")

	if token == "" {
		token = c.Get("Authorization")
		if token == "" {
			return c.Status(404).JSON(fiber.Map{
				"message": "please login",
			})
		}
	}

	username, err := DecodeJwt(token)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "please login",
		})
	}

	res, err := model.GetUserById(username)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "please login",
		})
	}

	c.Locals("_id", res.Id.Hex())
	c.Locals("username", res.Username)
	return c.Next()
}
