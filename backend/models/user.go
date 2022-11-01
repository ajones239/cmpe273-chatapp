package models

//this struct can be used to migrate user info to DB
//Also perform CRUD operations to validate info
type User struct {
	Id       uint   `bson: "user_id"`
	Name     string `bson: "name"`
	Email    string `bson: "email"`
	Password []byte `bson: "password"`
}
