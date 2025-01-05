package service

import (
	"context"
	"pass-saver/src/pkg/models"
	"pass-saver/src/pkg/schemas"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	Model *mongo.Collection
}

func (r *UserService) GetUserById(c context.Context, id primitive.ObjectID) (*models.User, error) {
	var user models.User

	if err := r.Model.FindOne(c, bson.M{"_id": id}).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserService) GetUserByEmail(c context.Context, email string) (*models.User, error) {
	var user models.User

	if err := r.Model.FindOne(c, bson.M{"email": email}).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *UserService) CreateUser(c *fiber.Ctx, user *schemas.CreateUser) (*mongo.InsertOneResult, error) {
	newUser := models.User{
		Id:                  primitive.NewObjectID(),
		Name:                user.Name,
		Email:               user.Email,
		EncryptedMasterKey:   user.EncryptedMasterKey,
		KeyDecryptionNonce:  user.KeyDecryptionNonce,
		KeyDecryptionSalt:   user.KeyDecryptionSalt,
		KekOpsLimit:         user.KekOpsLimit,
		KekMemLimit:         user.KekMemLimit,
		// RecoveryCode:        user.RecoveryCode,
		PublicKey:           user.PublicKey,
		EncryptedPrivateKey: user.EncryptedPrivateKey,
	}

	userExist, err := u.GetUserByEmail(c.Context(), user.Email)
	if userExist != nil {
		return nil, err
	}
	result, err := u.Model.InsertOne(c.Context(), newUser)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *UserService) UpdateUser(c *fiber.Ctx, id string, user models.User) (*mongo.UpdateResult, error) {
	result, err := u.Model.UpdateOne(c.Context(), bson.M{"_id": id}, bson.M{"$set": user})
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *UserService) GetAllUsers(c *fiber.Ctx) ([]models.User, error) {
	var users []models.User

	cursor, err := u.Model.Find(c.Context(), bson.M{})
	if err != nil {
		return nil, err
	}

	if err := cursor.All(c.Context(), &users); err != nil {
		return nil, err
	}

	return users, nil
}
