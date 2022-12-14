package routes

import (
	"fiber/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

    app.Post("/api/register", controllers.Register)
    app.Post("/api/login", controllers.Login)
    app.Get("/api/user", controllers.User)
    app.Post("/api/logout", controllers.Logout)
    app.Post("/api/image/:imgName", controllers.AddImage)
    app.Get("/api/image/:imgName", controllers.GetImage)
    app.Get("/api/image", controllers.GetImages)
}
