package schemas

import "pass-saver/src/models"

type VaultSchema struct{
	Data models.VaultData `json:"data" bson:"data"`
	Site string `json:"site" bson:"site" validate:"required"`
}
