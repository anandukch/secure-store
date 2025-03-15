package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Otp struct {
	Id     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email  string             `json:"email" bson:"email"`
	Secret string             `json:"secret" bson:"secret"`
	// NewUser bool               `json:"newUser" bson:"newUser"`
	// UserId  primitive.ObjectID `json:"userId" bson:"userId"`

}
