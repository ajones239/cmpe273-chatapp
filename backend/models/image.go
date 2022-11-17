package models

type Image struct {
    Name string `json:"name" bson:"_id"`
    Data string `json:"data" bson:"data"`
}
