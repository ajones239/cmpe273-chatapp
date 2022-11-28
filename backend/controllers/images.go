package controllers

import (
    "encoding/base64"
    "context"
    "fiber/dbconnect"
    "fiber/models"
    "log"
    "fmt"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt"
    "go.mongodb.org/mongo-driver/bson"
)

func AddImage(c *fiber.Ctx) error {
    imgName := c.Params("imgName")
    var img models.Image
    b64Str := base64.StdEncoding.EncodeToString(c.Body())
    img.Name = imgName
    img.Data = b64Str

    ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
    log.Println("Saving image to database: " + imgName)
    _, err := dbconnect.Collection.InsertOne(ctx, img)
    if err != nil {
        return err
    }
    return nil
}

func GetImage(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	_, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "user is unauthenticated",
		})
	}

    imgName := c.Params("imgName")
    var img models.Image
    ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
    err = dbconnect.Collection.FindOne(ctx, bson.D{{"_id", imgName}}).Decode(&img)
    if err != nil {
        return err
    }
    return c.JSON(img)
}

func GetImageNames(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	_, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "user is unauthenticated",
		})
	}

    imgs := make([]string, 0) 
    ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
    cursor, err := dbconnect.Collection.Find(ctx, bson.D{})
    if err != nil {
       return err
    }
    defer cursor.Close(context.Background())
    for cursor.Next(context.Background()) {
        var t map[string]interface{}
        cursor.Decode(&t)
        if _, ok := t["password"]; !ok { // ignore users, only interested in images
          imgs = append(imgs, fmt.Sprint(t["_id"]))
        }
    }
    if err := cursor.Err(); err != nil {
      return err
    }
    return c.JSON(imgs)
}
