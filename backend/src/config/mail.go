package config

import (
	"fmt"
	gomail "gopkg.in/mail.v2"
)

func SendMail() {
	message := gomail.NewMessage()

	// Set email headers
	message.SetHeader("From", "youremail@email.com")
	message.SetHeader("To", "recipient1@email.com")
	message.SetHeader("Subject", "Hello from the Mailtrap team")

	// Set email body
	message.SetBody("text/plain", "This is the Test Body")

	// Set up the SMTP dialer
	dialer := gomail.NewDialer("live.smtp.mailtrap.io", 587, "api", "123")

	// Send the email
	if err := dialer.DialAndSend(message); err != nil {
		fmt.Println("Error:", err)
		panic(err)
	} else {
		fmt.Println("Email sent successfully!")
	}
}
