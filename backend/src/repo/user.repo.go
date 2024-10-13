package repo

import (
	"pass-saver/src/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository struct {
	Model *mongo.Collection
}

func (r *UserRepository) GetUserById(c *fiber.Ctx, id primitive.ObjectID) (*models.User, error) {
	var user models.User

	if err := r.Model.FindOne(c.Context(), bson.M{"_id": id}).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetUserByEmail(c *fiber.Ctx, email string) (*models.User, error) {
	var user models.User

	if err := r.Model.FindOne(c.Context(), bson.M{"email": email}).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *UserRepository) CreateUser(c *fiber.Ctx, user models.User) (*mongo.InsertOneResult, error) {
	result, err := u.Model.InsertOne(c.Context(), user)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *UserRepository) UpdateUser(c *fiber.Ctx, id string, user models.User) (*mongo.UpdateResult, error) {
	result, err := u.Model.UpdateOne(c.Context(), bson.M{"_id": id}, bson.M{"$set": user})
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *UserRepository) GetAllUsers(c *fiber.Ctx) ([]models.User, error) {
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


