package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/vaibhavm18/go-blind/common"
	"github.com/vaibhavm18/go-blind/router"
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
	err := common.LoadEnv()

	if err != nil {
		return err
	}

	// Connect DB
	err = common.InitDB()

	if err != nil {
		return err
	}

	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New())
	app.Use(recover.New())

	router.AddHomeGroup(app)

	var port string
	if port = os.Getenv("PORT"); port == "" {
		port = "8080"
	}
	app.Listen(":" + port)

	return nil
}
