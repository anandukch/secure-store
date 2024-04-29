package models

import (
	"pass-saver/src/utils"

	"go.mongodb.org/mongo-driver/bson/primitive"
)
type Vault struct {
	Id   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId primitive.ObjectID `json:"userId" bson:"userId"`
	Type utils.CredType     `json:"type" bson:"type"`
	Data interface{}        `json:"data" bson:"data"`
}
