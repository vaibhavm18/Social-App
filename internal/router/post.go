package router

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/vaibhavm18/go-blind/internal/model"
	"github.com/vaibhavm18/go-blind/internal/util"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddPostGroup(app *fiber.App) {
	postGroup := app.Group("/api/v1/post")
	postGroup.Use(util.VerifyUser)

	postGroup.Get("/", getPosts)
	postGroup.Post("/create", createPost)
	postGroup.Put("/like", likePost)
	postGroup.Put("/dislike", dislikePost)
	postGroup.Put("/remove-like", removelike)
	postGroup.Put("/remove-dislike", removedislike)
}

func postCheck(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{"message": "Hello, World 👋!"})
}

func createPost(c *fiber.Ctx) error {
	var post model.PostModel

	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	id := c.Locals("_id")
	name := c.Locals("username")

	if id, ok := id.(string); ok {
		post.AuthorID, _ = primitive.ObjectIDFromHex(id)
	}
	if name, ok := name.(string); ok {
		post.AuthorName = name
	}

	res, err := model.CreatePost(post)

	if err != nil {
		return c.Status(403).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
		"data":    res,
	})
}

func getPosts(c *fiber.Ctx) error {
	page := c.Query("page")

	pageToNum, err := strconv.Atoi(page)

	if err != nil {
		pageToNum = 1
	}

	res, err := model.GetPosts(pageToNum)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
		"data":    res,
	})
}

func likePost(c *fiber.Ctx) error {

	var input model.PostInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	val := c.Locals("_id")

	if val != nil {
		if strVal, ok := val.(string); ok {
			input.UserID, _ = primitive.ObjectIDFromHex(strVal)
		}
	}

	err := model.LikePost(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func dislikePost(c *fiber.Ctx) error {
	var input model.PostInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	val := c.Locals("_id")

	if val != nil {
		if strVal, ok := val.(string); ok {
			input.UserID, _ = primitive.ObjectIDFromHex(strVal)
		}
	}

	err := model.DislikePost(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func removelike(c *fiber.Ctx) error {
	var input model.PostInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	val := c.Locals("_id")

	if val != nil {
		if strVal, ok := val.(string); ok {
			input.UserID, _ = primitive.ObjectIDFromHex(strVal)
		}
	}

	err := model.UnlikePost(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func removedislike(c *fiber.Ctx) error {
	var input model.PostInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	val := c.Locals("_id")

	if val != nil {
		if strVal, ok := val.(string); ok {
			input.UserID, _ = primitive.ObjectIDFromHex(strVal)
		}
	}

	err := model.RemoveDislike(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}
