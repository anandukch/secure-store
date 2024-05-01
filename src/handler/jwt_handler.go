package handler

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)
var (
    // Secret key to sign the JWT
    secretKey = []byte("your-secret-key")
)

func GenerateJwtToken(userId string, email string) (string, error) {
	claims := jwt.MapClaims{}
	claims["email"] = email
	claims["id"] = userId
	claims["exp"] = time.Now().Add(time.Hour * 24 * 7).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secretKey)
}

func ExtractClaims(tokenStr string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, err
	}
}