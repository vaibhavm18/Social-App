package router

import (
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/vaibhavm18/go-blind/internal/model"
	"github.com/vaibhavm18/go-blind/internal/util"
)

func AddPostGroup(app *fiber.App) {
	postGroup := app.Group("/api/v1/post")
	postGroup.Use(util.VerifyUser)

	postGroup.Get("/", getPosts)
	postGroup.Post("/create", createPost)
	postGroup.Put("/like", likePost)
	postGroup.Put("/dislike", dislikePost)
	postGroup.Delete("/removeLike", removelike)
	postGroup.Delete("/removedislike", removedislike)
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

	res, err := model.CreatePost(post)

	if err != nil {
		return c.Status(403).JSON(fiber.Map{
			"errorMessage": err,
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
		"data":    res,
	})
}

func getPosts(c *fiber.Ctx) error {
	// TODO: get 10 Post at a one request using pagination

	page := c.Query("page")

	fmt.Println("Page", page)

	pageToNum, err := strconv.Atoi(page)

	if err != nil {
		pageToNum = 1
	}

	res, err := model.GetPosts(pageToNum)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{
			"errorMessage": err,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
		"data":    res,
	})
}

func likePost(c *fiber.Ctx) error {

	// TODO: Like the post
	var input model.PostInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": "Every field is required",
		})
	}

	err := model.LikePost(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err,
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

	err := model.DislikePost(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err,
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

	err := model.UnlikePost(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err,
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

	err := model.RemoveDislike(input)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err,
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}
