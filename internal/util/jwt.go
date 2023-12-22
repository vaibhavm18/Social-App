package util

import (
	"errors"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateJwt(id string, username string) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       id,
		"username": username,
		"exp":      time.Now().Add(time.Hour * 1).Unix(),
	})

	secret, err := getSecreteKey()

	if err != nil {
		return "", err
	}

	tokenString, err := token.SignedString(secret)

	return tokenString, err
}

func getSecreteKey() ([]byte, error) {
	key := os.Getenv("SECRET_KEY")
	if key == "" {
		return nil, errors.New("Could not load jwt secret key")
	}
	return []byte(key), nil
}
