package config

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

type Mailer struct {
	service *gmail.Service
	sender  string
}

func NewMailer() *Mailer {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	clientID := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	refreshToken := os.Getenv("REFRESH_TOKEN")
	sender := "secure@store.com"
	if clientID == "" || clientSecret == "" || refreshToken == "" || sender == "" {
		log.Fatal("Missing environment variables")
	}

	config := &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Endpoint:     google.Endpoint,
	}

	token := &oauth2.Token{
		RefreshToken: refreshToken,
	}

	client := config.Client(context.Background(), token)
	service, err := gmail.New(client)
	if err != nil {
		log.Fatalf("Unable to create Gmail service: %v", err)
	}

	return &Mailer{
		service: service,
		sender:  sender,
	}
}

func (m *Mailer) SendEmail(to string, subject string, body string) error {
	emailBody := fmt.Sprintf(
		"From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s",
		m.sender, to, subject, body,
	)

	message := &gmail.Message{
		Raw: base64.URLEncoding.EncodeToString([]byte(emailBody)),
	}

	_, err := m.service.Users.Messages.Send("me", message).Do()
	if err != nil {
		return fmt.Errorf("unable to send email: %v", err)
	}

	fmt.Println("Email sent successfully!")
	return nil
}
