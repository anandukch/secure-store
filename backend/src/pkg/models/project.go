package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId      primitive.ObjectID `json:"userId" bson:"userId"`
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
}
