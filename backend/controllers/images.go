package controllers

import (
    "encoding/base64"
	"context"
	"fiber/dbconnect"
	"fiber/models"
	"fmt"
	"time"

	//"time"

	//"strconv"

	"github.com/gofiber/fiber/v2"
	// "github.com/golang-jwt/jwt"
    // "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"

	//"github.com/golang-jwt/jwt/v4"

	// "golang.org/x/crypto/bcrypt"
)

func AddImage(c *fiber.Ctx) error {
    imgName := c.Params("imgName")
    var img models.Image
    b64Str := base64.StdEncoding.EncodeToString(c.Body())
    img.Name = imgName
    img.Data = b64Str
    ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
    fmt.Println(imgName)
    _, err := dbconnect.Collection.InsertOne(ctx, img)
    if err != nil {
        return err
    }
    return nil
}

func GetImage(c *fiber.Ctx) error {
    imgName := c.Params("imgName")
    var img models.Image
    ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
    err := dbconnect.Collection.FindOne(ctx, bson.D{{"_id", imgName}}).Decode(&img)
    if err != nil {
        return err
    }
    return c.JSON(img)
}
