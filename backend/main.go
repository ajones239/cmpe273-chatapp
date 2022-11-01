package main

import (
	"fiber/dbconnect"
	"fiber/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	dbconnect.Connect()

	app := fiber.New()

	//used as middleware b/w two different ports
	//fe will run on one port and be will run on another
	//make sure fe can get cookie and send it back
	//used only when authenticating user using HTTPOnly cookies
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)
	app.Listen(":8000")
}
