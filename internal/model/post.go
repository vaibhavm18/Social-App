package model

import (
	"time"

	// "github.com/vaibhavm18/go-blind/internal/config"
	"github.com/faceair/jio"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostModel struct {
	ID          primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	AuthorID    primitive.ObjectID   `json:"authorId" bson:"authorId"`
	Title       string               `json:"title" bson:"title"`
	Description string               `json:"description" bson:"description"`
	Likes       []primitive.ObjectID `json:"likes" bson:"likes"`
	Dislikes    []primitive.ObjectID `json:"dislikes" bson:"dislikes"`
	CreatedAt   time.Time            `json:"createdAt" bson:"createdAt"`
}

type CommentModel struct {
	ID        primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	PostID    primitive.ObjectID   `json:"postId" bson:"postId"`
	CreatedAt time.Time            `json:"createdAt" bson:"createdAt"`
	Comment   string               `json:"comment" bson:"comment"`
	Likes     []primitive.ObjectID `json:"likes" bson:"likes"`
}

func CreatePost(post PostModel) {
	// col := config.GetDBCollection("Posts")
}

func validatePostInput(post PostModel) error {
	data, err := structToByte[*PostModel](&post)

	if err != nil {
		return err
	}

	_, err = jio.ValidateJSON(&data, jio.Object().Keys(jio.K{
		"username": jio.String().Required().Min(3).Max(10),
		// "password": jio.String().Min(6),
	}))
	return nil
}

func DeletePost() {

}

func GetAllpost() {

}

func GetPostById() {

}

func GetMyPost() {

}

func LikePost() {

}

func UnlikePost() {

}

func DislikePost() {

}

func UnDislikePost() {

}

func CreateComment() {

}

func DeleteComment() {

}

func LikeComment() {

}

func UnlikeComment() {

}
