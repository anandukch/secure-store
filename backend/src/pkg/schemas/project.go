package schemas

type ProjectRequest struct {
	EncryptedKey             string `json:"encryptedKey" validate:"required"`
	KeyDecryptionNonce       string `json:"keyDecryptionNonce" validate:"required"`
	EncryptedMetadata        string `json:"encryptedMetadata" validate:"required"`
	MetadataDecryptionHeader string `json:"metadataDecryptionHeader" validate:"required"`
}
