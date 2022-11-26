package models

import "go.mongodb.org/mongo-driver/bson/primitive"

//this struct can be used to migrate user info to DB
//Also perform CRUD operations to validate info
type User struct {
	Id       primitive.ObjectID `json:"id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Email    string             `json:"email" bson:"email"`
	Password []byte             `json:"password" bson:"password"`
}
