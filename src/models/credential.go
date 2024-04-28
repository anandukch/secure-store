package models

import (
	"pass-saver/src/utils"

	"go.mongodb.org/mongo-driver/bson/primitive"
)
type Credential struct {
	Id   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Type utils.CredType     `json:"type" bson:"type"`
	Username string         `json:"username" bson:"username"`
	Email	string         `json:"email" bson:"email"`
	Password string        `json:"password" bson:"password"`
}
