package models

import "go.mongodb.org/mongo-driver/bson/primitive"

//this struct can be used to migrate user info to DB
//Also perform CRUD operations to validate info
type User struct {
	Id       primitive.ObjectID `bson:"_id"`
	Name     string             `bson:"name"`
	Email    string             `bson:"email"`
	Password []byte             `bson:"password"`
}
