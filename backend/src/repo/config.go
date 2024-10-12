package repo

import "go.mongodb.org/mongo-driver/mongo"

type RepoConfig struct {
	collection *mongo.Collection
}

func CreateRepo(collection *mongo.Collection) *RepoConfig {
	return &RepoConfig{collection: collection}
}
