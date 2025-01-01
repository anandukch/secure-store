package models

type Vault struct {
	Id                       string `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID                   string `json:"userId" bson:"userId"`
	SiteUrl                  string `json:"siteUrl" bson:"siteUrl"`
	EncryptedKey             string `json:"encryptedKey" bson:"encryptedKey"`
	KeyDecryptionNonce       string `json:"keyDecryptionNonce" bson:"keyDecryptionNonce"`
	EncryptedMetadata        string `json:"encryptedMetadata" bson:"encryptedMetadata"`
	MetadataDecryptionHeader string `json:"metadataDecryptionHeader" bson:"metadataDecryptionHeader"`
}
