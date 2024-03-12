package model

import (
	"context"
	"errors"
	"time"

	"github.com/faceair/jio"
	"github.com/vaibhavm18/go-blind/internal/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PostModel struct {
	ID          primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	AuthorID    primitive.ObjectID   `json:"authorId" bson:"authorId"`
	AuthorName  string               `json:"authorName" bson:"authorName"`
	Title       string               `json:"title" bson:"title"`
	Description string               `json:"description" bson:"description"`
	Likes       []primitive.ObjectID `json:"likes,omitempty" bson:"likes,omitempty"`
	Dislikes    []primitive.ObjectID `json:"dislikes,omitempty" bson:"dislikes,omitempty"`
	CreatedAt   time.Time            `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
}

type PostInput struct {
	UserID primitive.ObjectID `json:"userId" bson:"userId"`
	PostID primitive.ObjectID `json:"postId" bson:"postId"`
}

// type CommentModel struct {
// 	ID        primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
// 	PostID    primitive.ObjectID   `json:"postId" bson:"postId"`
// 	CreatedAt time.Time            `json:"createdAt" bson:"createdAt"`
// 	Comment   string               `json:"comment" bson:"comment"`
// 	Likes     []primitive.ObjectID `json:"likes" bson:"likes"`
// }

func CreatePost(post PostModel) (PostModel, error) {
	col := config.GetDBCollection("Posts")

	err := validatePostInput(post)

	if err != nil {
		return PostModel{}, err
	}

	post.CreatedAt = time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	res, err := col.InsertOne(ctx, post)

	if err != nil {
		return PostModel{}, err
	}

	return PostModel{
		ID:          res.InsertedID.(primitive.ObjectID),
		Title:       post.Title,
		Description: post.Description,
		CreatedAt:   post.CreatedAt,
		AuthorID:    post.AuthorID,
		AuthorName:  post.AuthorName,
	}, nil

}

func validatePostInput(post PostModel) error {
	data, err := structToByte[*PostModel](&post)

	if err != nil {
		return err
	}

	_, err = jio.ValidateJSON(&data, jio.Object().Keys(jio.K{
		"title":       jio.String().Required().Min(12).Max(100),
		"description": jio.String().Min(40).Max(4000),
	}))

	if err != nil {
		return err
	}

	return nil
}

func GetPosts(page int) ([]PostModel, error) {
	collection := config.GetDBCollection("Posts")
	perPage := 3
	skip := (page - 1) * perPage

	opts := options.Find()

	opts.SetSkip(int64(skip))
	opts.SetLimit(int64(perPage))
	opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})

	res, err := collection.Find(context.Background(), bson.M{}, opts)

	if err != nil {
		return nil, err
	}

	var posts []PostModel

	for res.Next(context.Background()) {
		var post PostModel
		if err := res.Decode(&post); err != nil {
			return nil, err
		}

		posts = append(posts, post)
	}

	if err := res.Err(); err != nil {
		return nil, err
	}

	res.Close(context.Background())

	return posts, nil
}

func LikePost(input PostInput) error {
	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": input.PostID}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	for _, likedBy := range post.Likes {
		if likedBy == input.UserID {
			return errors.New("User already liked the post")
		}
	}
	update := bson.M{"$addToSet": bson.M{"likes": input.UserID}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	err = RemoveDislike(input)

	if err != nil {
		return err
	}

	return nil
}

func UnlikePost(input PostInput) error {
	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": input.PostID}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	isLiked := false
	for _, likedBy := range post.Likes {
		if likedBy == input.UserID {
			isLiked = true
		}
	}

	if !isLiked {
		return errors.New("User did not liked this post")
	}

	update := bson.M{"$pull": bson.M{"likes": input.UserID}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	_ = RemoveDislike(input)

	return nil
}

func DislikePost(input PostInput) error {

	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": input.PostID}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	for _, dislikedBy := range post.Dislikes {
		if dislikedBy == input.UserID {
			return errors.New("User already diliked the post")
		}
	}
	update := bson.M{"$addToSet": bson.M{"dislikes": input.UserID}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	_ = UnlikePost(input)

	return nil
}

func RemoveDislike(input PostInput) error {
	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": input.PostID}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	isAlreadyDislike := false
	for _, dislikedBy := range post.Dislikes {
		if dislikedBy == input.UserID {
			isAlreadyDislike = true
		}
	}

	if !isAlreadyDislike {
		return errors.New("User already diliked the post.")
	}

	update := bson.M{"$pull": bson.M{"dislikes": input.UserID}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	// err = UnlikePost(input)

	if err != nil {
		return err
	}

	return nil
}
