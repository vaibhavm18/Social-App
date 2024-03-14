package model

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/faceair/jio"
	"github.com/vaibhavm18/go-blind/internal/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username" bson:"username"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
}

func userExists(email, username string) bool {
	filter := bson.M{"$or": []bson.M{
		{"email": email},
		{"username": username},
	}}

	collection := config.GetDBCollection("Users")

	count, err := collection.CountDocuments(context.Background(), filter)

	if err != nil {
		return false
	}

	return count > 0
}

func CreateUser(user User) (User, error) {
	err := validateSignUp(user)

	if err != nil {
		return User{}, err
	}

	collection := config.GetDBCollection("Users")

	exist := userExists(user.Email, user.Username)

	if exist {
		return User{}, errors.New("User already exist. Please login")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return User{}, err
	}

	user.Password = string(hash)

	res, err := collection.InsertOne(context.TODO(), user)

	if err != nil {
		return User{}, err
	}

	user.Password = ""
	user.Id = res.InsertedID.(primitive.ObjectID)

	return user, nil
}

func GetUserByUsername(input User) (User, error) {
	var newUser User

	err := validatLogin(input)

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

func GetUserById(username string) (User, error) {
	var newUser User
	collection := config.GetDBCollection("Users")

	err := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&newUser)

	return newUser, err
}

func validateSignUp(user User) error {
	data, err := structToByte(user)

	if err != nil {
		return err
	}

	_, err = jio.ValidateJSON(&data, jio.Object().Keys(jio.K{
		"username": jio.String().Required().Min(3).Max(10),
		"password": jio.String().Required().Min(6).Required(),
		"email":    jio.String().Required().Regex(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`),
	}))

	if err != nil {
		return err
	}

	return nil
}

func validatLogin(user User) error {
	data, err := structToByte[User](user)

	if err != nil {
		return err
	}

	_, err = jio.ValidateJSON(&data, jio.Object().Keys(jio.K{
		"username": jio.String().Min(3).Max(10).Required(),
		"password": jio.String().Min(6).Required(),
	}))

	return err
}

func structToByte[T comparable](u T) ([]byte, error) {
	marshal, err := json.Marshal(u)

	if err != nil {
		return nil, errors.New("Something went wrong")
	}

	data := []byte(marshal)
	return data, nil
}
