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
	postGroup.Get("/:id", getPostById)
	postGroup.Post("/create", createPost)
	postGroup.Put("/like/:id", likePost)
	postGroup.Put("/dislike/:id", dislikePost)
	postGroup.Put("/remove-like/:id", removelike)
	postGroup.Put("/remove-dislike/:id", removedislike)
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

func getPostById(c *fiber.Ctx) error {
	postStr := c.Params("id")

	idStr := c.Locals("_id")

	strVal, _ := idStr.(string)

	id, _ := primitive.ObjectIDFromHex(strVal)

	postId, _ := primitive.ObjectIDFromHex(postStr)

	post, err := model.PostById(postId, id)

	if err != nil {
		return c.Status(403).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
		"post":    post,
	})
}

func getPosts(c *fiber.Ctx) error {
	page := c.Query("page")

	pageToNum, err := strconv.Atoi(page)

	if err != nil {
		pageToNum = 1
	}

	id := c.Locals("_id")

	conStr, ok := id.(string)
	if !ok {
		return c.Status(404).JSON(fiber.Map{
			"errorMessage": "Invalid",
		})
	}

	res, err := model.GetPosts(pageToNum, conStr)

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

	postStr := c.Params("id")

	idStr := c.Locals("_id")

	strVal, _ := idStr.(string)

	id, _ := primitive.ObjectIDFromHex(strVal)

	postId, _ := primitive.ObjectIDFromHex(postStr)

	err := model.LikePost(id, postId)

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
	postStr := c.Params("id")

	idStr := c.Locals("_id")

	strVal, _ := idStr.(string)

	id, _ := primitive.ObjectIDFromHex(strVal)

	postId, _ := primitive.ObjectIDFromHex(postStr)

	err := model.DislikePost(id, postId)

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
	postStr := c.Params("id")

	idStr := c.Locals("_id")

	strVal, _ := idStr.(string)

	id, _ := primitive.ObjectIDFromHex(strVal)

	postId, _ := primitive.ObjectIDFromHex(postStr)

	err := model.UnlikePost(id, postId)

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
	postStr := c.Params("id")

	idStr := c.Locals("_id")

	strVal, _ := idStr.(string)

	id, _ := primitive.ObjectIDFromHex(strVal)

	postId, _ := primitive.ObjectIDFromHex(postStr)

	err := model.RemoveDislike(id, postId)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"errorMessage": err.Error(),
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}
