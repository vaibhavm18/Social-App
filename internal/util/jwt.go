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
		"exp":      time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	secret, err := getSecreteKey()

	if err != nil {
		return "", err
	}

	tokenString, err := token.SignedString(secret)

	return tokenString, err
}

type Clime struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	jwt.StandardClaims
}

func DecodeJwt(token string) (string, error) {
	secret, err := getSecreteKey()

	if err != nil {
		return "", errors.New("Session Expired, Please login.")
	}

	res, err := jwt.ParseWithClaims(token, &Clime{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return "", errors.New("Session Expired, Please login.")
	}

	if claims, ok := res.Claims.(*Clime); ok && res.Valid {
		return claims.Username, nil
	}

	return "", errors.New("Session Expired, Please login.")
}

func getSecreteKey() ([]byte, error) {
	key := os.Getenv("SECRET_KEY")

	if key == "" {
		return nil, errors.New("Could not load jwt secret key")
	}
	return []byte(key), nil
}
