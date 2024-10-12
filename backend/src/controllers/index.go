package controllers

import (
	"pass-saver/src/config"

	"go.mongodb.org/mongo-driver/mongo"
)
const USERS = "users"
const VAULT = "vault"

var userCollection *mongo.Collection = config.GetCollection(USERS)
var vaultCollection *mongo.Collection = config.GetCollection(VAULT)

