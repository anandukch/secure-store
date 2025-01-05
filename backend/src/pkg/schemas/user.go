package schemas

type AuthRequest struct {
	Email    string `json:"email"`
}

type AuthResponse struct {
	Token string `json:"token"`
}

type CreateUser struct {
	Name  string `json:"name" validate:"required"`
	Email string `json:"email" validate:"required,email"`

	EncryptedMasterKey   string `json:"encryptedMasterKey" validate:"required"`
	KeyDecryptionNonce  string `json:"keyDecryptionNonce" validate:"required"`
	KeyDecryptionSalt   string `json:"keyDecryptionSalt" validate:"required"`
	KekOpsLimit         int    `json:"kekOpsLimit" validate:"required"`
	KekMemLimit         int    `json:"kekMemLimit" validate:"required"`
	// RecoveryCode        string `json:"recoveryCode" validate:"required"`
	PublicKey           string `json:"publicKey" validate:"required"`
	EncryptedPrivateKey string `json:"encryptedPrivateKey" validate:"required"`
}

type UserEmail struct {
	Email string `json:"email" validate:"required,email"`
}
