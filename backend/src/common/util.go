package common

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ToObjectID(id string) (primitive.ObjectID, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return primitive.ObjectID{}, fmt.Errorf("invalid object ID format")
	}

	return objectID, nil
}
