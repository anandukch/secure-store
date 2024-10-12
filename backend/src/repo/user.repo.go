package repo

import (
	"pass-saver/src/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepo interface {
	GetUserById(c *fiber.Ctx, id string) (*models.User, error)
	CreateUser(c *fiber.Ctx, user models.User) (*mongo.InsertOneResult, error)
	GetUserByEmail(c *fiber.Ctx, email string) (*models.User, error)
	UpdateUser(c *fiber.Ctx, id string, user models.User) (*mongo.UpdateResult, error)
	GetAllUsers(c *fiber.Ctx) ([]models.User, error)
}

func (u *RepoConfig) GetUserById(c *fiber.Ctx, id string) (*models.User, error) {
	var user models.User

	if err := u.collection.FindOne(c.Context(), bson.M{"_id": id}).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *RepoConfig) GetUserByEmail(c *fiber.Ctx, email string) (*models.User, error) {
	var user models.User

	if err := u.collection.FindOne(c.Context(), bson.M{"email": email}).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *RepoConfig) CreateUser(c *fiber.Ctx, user models.User) (*mongo.InsertOneResult, error) {
	result, err := u.collection.InsertOne(c.Context(), user)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *RepoConfig) UpdateUser(c *fiber.Ctx, id string, user models.User) (*mongo.UpdateResult, error) {
	result, err := u.collection.UpdateOne(c.Context(), bson.M{"_id": id}, bson.M{"$set": user})
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *RepoConfig) GetAllUsers(c *fiber.Ctx) ([]models.User, error) {
	var users []models.User

	cursor, err := u.collection.Find(c.Context(), bson.M{})
	if err != nil {
		return nil, err
	}

	if err := cursor.All(c.Context(), &users); err != nil {
		return nil, err
	}

	return users, nil
}
