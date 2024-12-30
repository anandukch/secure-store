package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	Id                       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserId                   primitive.ObjectID `json:"userId" bson:"userId"`
	EncryptedKey             string             `json:"encryptedKey" bson:"encryptedKey"`
	KeyDecryptionNonce       string             `json:"keyDecryptionNonce" bson:"keyDecryptionNonce"`
	EncryptedMetadata        string             `json:"encryptedMetadata" bson:"encryptedMetadata"`
	MetadataDecryptionHeader string             `json:"metadataDecryptionHeader" bson:"metadataDecryptionHeader"`
}
