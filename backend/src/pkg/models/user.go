package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id                  primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name                string             `json:"name" bson:"name"`
	Email               string             `json:"email" bson:"email" unique:"true"`
	EncryptedMasterKey  string             `json:"encryptedMasterKey" bson:"encrypedMasterKey"`
	KeyDecryptionNonce  string             `json:"keyDecryptionNonce" bson:"keyDecryptionNonce"`
	KeyDecryptionSalt   string             `json:"keyDecryptionSalt" bson:"keyDecryptionSalt"`
	KekOpsLimit         int                `json:"kekOpsLimit" bson:"kekOpsLimit"`
	KekMemLimit         int                `json:"kekMemLimit" bson:"kekMemLimit"`
	RecoveryCode        string             `json:"recoveryCode" bson:"recoveryCode"`
	PublicKey           string             `json:"publicKey" bson:"publicKey"`
	EncryptedPrivateKey string             `json:"encryptedPrivateKey" bson:"encryptedPrivateKey"`
	IsVerified          bool               `json:"isVerified" bson:"isVerified"`
}
