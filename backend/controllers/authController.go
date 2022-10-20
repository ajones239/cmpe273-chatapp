package controllers

import (
	"fiber/models"
	"time"

	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {

	//array of type string
	var data map[string]string
	//condition to parse error and return error
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	//using Golang library bcrypt to generate hashed password
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{

		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	//return c.SendString("Hello, World!")
	//return the user info using Postman to verify results
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	//array of type string
	var data map[string]string
	//condition to parse error and return error
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User
	//get email from DB and assign to first user var

	//see if email is found
	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	//if user is found, compare password
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "incorrect password",
		})
	}

	//Create jwt token for each user based on user ID
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		//convert user ID to a str since issuer only accepts str
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day limit
	})
	//create token key
	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Sorry, could not login",
		})
	}
	//send jwt token via cookie stored in frontend,
	//b/c frontend doesn't need to access this set HTTPonly
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	//Test block: first test user, then token, if both work, send cookie only
	//return c.JSON(user)
	//now return jwt token
	//return c.JSON(token)

	//once cookie is sent
	return c.JSON(fiber.Map{
		"message": "success",
	})

}

func User(c *fiber.Ctx) error {

	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		//return secret jwt key generated in login func if no error
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "user is unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	//var user models.User

	//database.DB.Where("id = ?", claims.Issuer).First(&user)
	//return c.JSON(user)
	return c.JSON(claims)
}

func Logout(c *fiber.Ctx) error {
	//need to remove cookie  created
	// to do this, create another cookie and set expiration time to a past time
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "logged out, success",
	})
}
