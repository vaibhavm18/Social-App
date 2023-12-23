package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/vaibhavm18/go-blind/internal/config"
	"github.com/vaibhavm18/go-blind/internal/router"
	"github.com/vaibhavm18/go-blind/internal/util"
)

func main() {
	fmt.Println("hello god!")

	err := run()

	if err != nil {
		panic(err)
	}

}

func run() error {
	// Load Env
	err := config.LoadEnv()

	if err != nil {
		return err
	}

	// To test JWT generating
	_, err = util.GenerateJwt("", "")

	if err != nil {
		return err
	}

	// Connect DB
	err = config.InitDB()

	if err != nil {
		return err
	}

	defer config.CloseDB()

	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New())
	app.Use(recover.New())

	// routes
	router.AddHomeGroup(app)
	router.AddAuthGroup(app)

	var port string
	if port = os.Getenv("PORT"); port == "" {
		port = "8080"
	}
	app.Listen(":" + port)

	return nil
}
