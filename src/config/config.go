package config

import(
	"log"
	"os"
	"github.com/joho/godotenv"
)

func GetMongoURI() string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return os.Getenv("MONGO_URI")
}