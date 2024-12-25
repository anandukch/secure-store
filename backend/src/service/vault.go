package service

import (
	"context"
	"pass-saver/src/pkg/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type VaultService struct {
	Model *mongo.Collection
}


func (v *VaultService) GetByUserId(c context.Context, userId primitive.ObjectID) (*models.Vault, error) {
	var vault models.Vault
	if err := v.Model.FindOne(c, bson.M{"userId": userId}).Decode(&vault); err != nil {
		return nil, err
	}

	return &vault, nil

}

func (v *VaultService) UpdateVault(c context.Context, userId primitive.ObjectID, data models.VaultData) (*mongo.UpdateResult, error) {
	result, err := v.Model.UpdateOne(c, bson.M{"userId": userId}, bson.M{"$set": bson.M{"data": data}})
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (v *VaultService) CreateVault(c context.Context, vault models.Vault) (*mongo.InsertOneResult, error) {
	result, err := v.Model.InsertOne(c, vault)
	if err != nil {
		return nil, err
	}

	return result, nil
}
