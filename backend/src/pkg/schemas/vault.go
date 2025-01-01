package schemas

type VaultRequest struct {
	ProjectId                string `json:"projectId" validate:"required"`
	SiteUrl                  string `json:"siteUrl" validate:"required"`
	EncryptedKey             string `json:"encryptedKey" validate:"required"`
	KeyDecryptionNonce       string `json:"keyDecryptionNonce" validate:"required"`
	EncryptedMetadata        string `json:"encryptedMetadata" validate:"required"`
	MetadataDecryptionHeader string `json:"metadataDecryptionHeader" validate:"required"`
}
