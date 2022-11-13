package main

import (
	"fiber/dbconnect"
	"fiber/routes"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
)

type client struct{}

var clients = make(map[*websocket.Conn]client)
var register = make(chan *websocket.Conn)
var broadcast = make(chan string)
var unregister = make(chan *websocket.Conn)

func hub() {

	for {
		select {
		case connection := <-register:
			clients[connection] = client{}
			log.Println("New User joined...")

		case message := <-broadcast:
			log.Println("message received: ", message)

			//broadcast message to all registered clients
			for connection := range clients {
				if err := connection.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
					log.Println("error: ", err)

					unregister <- connection
					connection.WriteMessage(websocket.CloseMessage, []byte{})
					connection.Close()
				}
			}

		case connection := <-unregister:

			//remove client from hub
			delete(clients, connection)

			log.Println("User Left...")

		}
	}
}

func main() {

	dbconnect.Connect()
	fmt.Println("Chatapp server")
	app := fiber.New()

	//used as middleware b/w two different ports
	//fe will run on one port and be will run on another
	//make sure fe can get cookie and send it back
	//used only when authenticating user using HTTPOnly cookies

	//app.Use(cors.New(cors.Config{
	//	AllowCredentials: true,
	//}))

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	go hub()

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		// Websocket logic
		// When the function returns, unregister the client and close the connection
		defer func() {
			unregister <- c
			c.Close()
		}()

		// Register the client
		register <- c

		for {
			messageType, message, err := c.ReadMessage()
			if err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
					log.Println("read error:", err)
				}

				return // Calls the deferred function, i.e. closes the connection on error
			}

			if messageType == websocket.TextMessage {
				// Broadcast the received message
				broadcast <- string(message)
			} else {
				log.Println("websocket message received of type", messageType)
			}
		}
	}))

	//user login server
	routes.Setup(app)
	app.Listen(":8000")
}
