package model

import (
	"context"
	"errors"
	"fmt"
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

type PostRes struct {
	PostModel
	TotalLikes    int    `json:"totalLikes" bson:"totalLikes"`
	TotalDislikes int    `json:"totalDislikes" bson:"totalDislikes"`
	Interaction   string `json:"interaction" bson:"interaction"`
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
	data, err := structToByte(&post)

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

func GetPosts(page int, id string) ([]PostRes, error) {
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

	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return nil, err
	}

	var posts []PostRes

	for res.Next(context.Background()) {
		var post PostModel
		if err := res.Decode(&post); err != nil {
			return nil, err
		}

		var res PostRes

		res.TotalLikes = len(post.Likes)
		res.TotalDislikes = len(post.Dislikes)
		for _, like := range post.Likes {
			if like == objectId {
				res.Interaction = "liked"
			}
		}

		for _, dislike := range post.Dislikes {
			if dislike == objectId {
				res.Interaction = "disliked"
			}
		}

		res.PostModel = post

		posts = append(posts, res)
	}

	if err := res.Err(); err != nil {
		return nil, err
	}

	res.Close(context.Background())

	return posts, nil
}

func PostById(postId primitive.ObjectID, id primitive.ObjectID) (PostRes, error) {
	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": postId}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return PostRes{}, err
	}

	var res PostRes

	res.TotalDislikes = len(post.Dislikes)
	res.TotalLikes = len(post.Likes)

	for _, like := range post.Likes {
		fmt.Println("res", like, id)
		if like == id {
			fmt.Println("yes")
			res.Interaction = "liked"
		}
	}

	for _, dislike := range post.Dislikes {
		if dislike == id {
			res.Interaction = "disliked"
		}
	}

	res.PostModel = post

	return res, err
}

func LikePost(id primitive.ObjectID, postId primitive.ObjectID) error {
	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": postId}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	for _, likedBy := range post.Likes {
		if likedBy == id {
			return errors.New("User already liked the post")
		}
	}
	update := bson.M{"$addToSet": bson.M{"likes": id}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	err = RemoveDislike(id, postId)

	if err != nil {
		return nil
	}

	return err
}

func UnlikePost(id primitive.ObjectID, postId primitive.ObjectID) error {
	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": postId}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	isLiked := false
	for _, likedBy := range post.Likes {
		if likedBy == id {
			isLiked = true
		}
	}

	if !isLiked {
		return errors.New("User did not liked this post")
	}

	update := bson.M{"$pull": bson.M{"likes": id}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return nil
}

func DislikePost(id primitive.ObjectID, postId primitive.ObjectID) error {

	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": postId}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	for _, dislikedBy := range post.Dislikes {
		if dislikedBy == id {
			return errors.New("User already diliked the post")
		}
	}

	update := bson.M{"$addToSet": bson.M{"dislikes": id}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	_ = UnlikePost(id, postId)

	return nil
}

func RemoveDislike(id primitive.ObjectID, postId primitive.ObjectID) error {
	col := config.GetDBCollection("Posts")

	filter := bson.M{"_id": postId}

	var post PostModel

	err := col.FindOne(context.Background(), filter).Decode(&post)

	if err != nil {
		return err
	}

	isAlreadyDislike := false
	for _, dislikedBy := range post.Dislikes {
		if dislikedBy == id {
			isAlreadyDislike = true
		}
	}

	if !isAlreadyDislike {
		return errors.New("User already diliked the post.")
	}

	update := bson.M{"$pull": bson.M{"dislikes": id}}
	_, err = col.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return nil
}
