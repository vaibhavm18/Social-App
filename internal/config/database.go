package config

import (
	"context"
	"errors"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var db *mongo.Database

func GetDBCollection(col string) *mongo.Collection {
	return db.Collection(col)
}

func InitDB() error {
	uri := os.Getenv("MONGODB_URL")

	if uri == "" {
		return errors.New("You must set your 'MONGO_URL' env variable.")
	}
	fmt.Println(uri)

	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))

	if err != nil {
		return err
	}

	db = client.Database("blind")

	return nil
}

func CloseDB() error {
	return db.Client().Disconnect(context.Background())
}
