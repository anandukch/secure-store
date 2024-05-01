package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Vault struct {
	Id     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId primitive.ObjectID `json:"userId" bson:"userId"`
	Data []VaultData `json:"data" bson:"data"`
	// Credit Card
	// Number string `json:"number" bson:"number"`
	// Expire string `json:"expire" bson:"expire"`
	// Cvv    string `json:"cvv" bson:"cvv"`
	// Personal
	FirstName string `json:"firstName" bson:"firstName"`
	LastName  string `json:"lastName" bson:"lastName"`
	Phone     string `json:"phone" bson:"phone"`
	Address   string `json:"address" bson:"address"`
	City      string `json:"city" bson:"city"`
	State     string `json:"state" bson:"state"`

}

type VaultData struct {
	// Credentials
	Email   string `json:"email" bson:"email"`
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`

	Site string `json:"site" bson:"site" validate:"required"`
}

