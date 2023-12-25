package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type postModel struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	AuthorID    primitive.ObjectID `json:"authorId" bson:"authorId"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Like        int                `json:"like" bson:"like"`
	Dislike     int                `json:"dislike" bson:"dislike"`
	CreatedAt   time.Time          `json:"createdAt" bson:"createdAt"`
}

type commentModel struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	PostID    primitive.ObjectID `json:"postId" bson:"postId"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	Comment   string             `json:"comment" bson:"comment"`
	Like      int                `json:"like" bson:"like"`
}

func CreatePost() {

}

func LikePost() {

}

func DislikePost() {

}

func CreateComment() {

}

func LikeComment() {

}

func DeleteComment() {

}
