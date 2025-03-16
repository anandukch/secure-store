package service

import (
	"context"

	"github.com/anandukch/secure-store/src/pkg/models"
	"github.com/anandukch/secure-store/src/pkg/schemas"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProjectService struct {
	Model *mongo.Collection
}

func (p *ProjectService) GetByUserId(c context.Context, userId string) (*models.Project, error) {
	var project models.Project
	if err := p.Model.FindOne(c, primitive.M{"userId": userId}).Decode(&project); err != nil {
		return nil, err
	}
	return &project, nil

}

func (p *ProjectService) UpdateProject(c context.Context, userId string, data *schemas.ProjectRequest) (*mongo.UpdateResult, error) {
	result, err := p.Model.UpdateOne(c, primitive.M{"userId": userId}, primitive.M{"$set": data})
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (p *ProjectService) CreateProject(c context.Context, userId primitive.ObjectID, project *schemas.ProjectRequest) (*mongo.InsertOneResult, error) {

	newProject := models.Project{
		UserId:      userId,
		Name:        project.Name,
		Description: project.Description,
	}

	result, err := p.Model.InsertOne(c, newProject)
	if err != nil {
		return nil, err
	}

	return result, nil
}
