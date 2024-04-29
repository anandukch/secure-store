package schemas

import "pass-saver/src/utils"

type VaultSchema struct{
	Type utils.CredType `json:"type" default:"password" validate:"required"`
	Data interface{} `json:"data" validate:"required"`
}