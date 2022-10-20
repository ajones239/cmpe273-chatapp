package models

//this struct can be used to migrate user info to DB
type User struct {
	Id       uint
	Name     string
	Email    string
	Password []byte
}
