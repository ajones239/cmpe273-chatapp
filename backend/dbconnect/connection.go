package dbconnect

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// client is exportted MongoDB client
var Client *mongo.Client
var Collection *mongo.Collection

var ctx = context.TODO()

// connect to MongoDB using func Connect
func Connect() {

	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, clientOptions)
	Client = client
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = Client.Ping(ctx, nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	userDB := Client.Database("Go_Auth")
	userCollection := userDB.Collection("Login")
	Collection = userCollection
	//trying to migrate user data to mongoDB here
	/*userResult, err := Collection.InsertOne(context.TODO(), &models.User{})

	if err != nil {
		panic(err)
	}

	fmt.Println("created user: ", userResult.InsertedID)

		err = Client.Disconnect(context.TODO())

		if err != nil {
			log.Fatal(err)
		}

		fmt.Println("Connection to DB closed.")

		if err != nil {
			log.Fatal(err)
		}
	*/
}
