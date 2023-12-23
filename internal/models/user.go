package models

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/faceair/jio"
	"github.com/vaibhavm18/go-blind/internal/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username" bson:"username"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
}

func CreateUser(user User) (*mongo.InsertOneResult, error) {
	_, err := structToByte[User](user)

	if err != nil {
		return nil, err
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return nil, err
	}

	user.Password = string(hash)

	collection := config.GetDBCollection("Users")
	res, err := collection.InsertOne(context.TODO(), user)

	if err != nil {
		return nil, err
	}

	user.Password = ""
	return res, nil
}

func GetUserByUsername(input User) (User, error) {
	var newUser User

	_, err := validatLogin(input)

	if err != nil {
		return User{}, err
	}

	collection := config.GetDBCollection("Users")

	err = collection.FindOne(context.TODO(), bson.M{"username": input.Username}).Decode(&newUser)

	if err != nil {
		return User{}, errors.New("Please create a account.")
	}

	err = bcrypt.CompareHashAndPassword([]byte(newUser.Password), []byte(input.Password))

	if err != nil {
		return User{}, err
	}

	return newUser, nil
}

func validateSignUp(user User) (User, error) {
	data, err := structToByte[User](user)

	if err != nil {
		return User{}, err
	}

	_, err = jio.ValidateJSON(&data, jio.Object().Keys(jio.K{
		"username": jio.String().Min(3).Max(10).Required(),
		"password": jio.String().Min(6).Required(),
		"email":    jio.String().Regex(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`).Required(),
	}))

	if err != nil {
		return User{}, err
	}

	return user, nil
}

func validatLogin(user User) (User, error) {
	data, err := structToByte[User](user)

	if err != nil {
		return User{}, err
	}

	_, err = jio.ValidateJSON(&data, jio.Object().Keys(jio.K{
		"username": jio.String().Min(3).Max(10).Required(),
		"password": jio.String().Min(6).Required(),
	}))
	return user, err
}

func structToByte[T comparable](u T) ([]byte, error) {
	marshal, err := json.Marshal(u)

	if err != nil {
		return nil, errors.New("Something went wrong")
	}

	data := []byte(marshal)
	return data, nil
}
