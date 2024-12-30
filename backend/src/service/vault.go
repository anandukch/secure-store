package service

import (
	"context"
	"pass-saver/src/pkg/models"
	"pass-saver/src/pkg/schemas"

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

func (v *VaultService) UpdateVault(c context.Context, userId primitive.ObjectID, data models.Vault) (*mongo.UpdateResult, error) {
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

func (v *VaultService) AddVault(c context.Context, userId primitive.ObjectID, vaultRequest *schemas.VaultRequest) (*mongo.InsertOneResult, error) {
	vault := models.Vault{
		UserID:                   userId.Hex(),
		EncryptedKey:             vaultRequest.EncryptedKey,
		KeyDecryptionNonce:       vaultRequest.KeyDecryptionNonce,
		EncryptedMetadata:        vaultRequest.EncryptedMetadata,
		MetadataDecryptionHeader: vaultRequest.MetadataDecryptionHeader,
	}
	result, err := v.Model.InsertOne(c, vault)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (v *VaultService) GetAllVaultByUserId(c context.Context, userId primitive.ObjectID) ([]models.Vault, error) {
	var vaults []models.Vault
	cursor, err := v.Model.Find(c, bson.M{"userId": userId})
	if err != nil {
		return nil, err
	}
	if err := cursor.All(c, &vaults); err != nil {
		return nil, err
	}

	return vaults, nil
}
