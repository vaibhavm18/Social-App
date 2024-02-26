package router

import (
	"github.com/gofiber/fiber/v2"
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
	// TODO: create Post
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func getPosts(c *fiber.Ctx) error {

	// TODO: get 10 Post at a one request using pagination
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func likePost(c *fiber.Ctx) error {

	// TODO: Like the post
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func dislikePost(c *fiber.Ctx) error {
	// TODO: dislike the post
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func removelike(c *fiber.Ctx) error {
	// TODO: removelike the post
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

func removedislike(c *fiber.Ctx) error {
	// TODO: removedislike the post
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}
