package utils

import (
	"fmt"
	"pass-saver/src/config"
)

func GenerateOtp() string {
	return "123456"
}

func SendOtp(to string) (string, error) {

	subject := "Your OTP Code"
	otp := GenerateOtp()
	body := fmt.Sprintf("Your OTP code is: %s", otp)
	mailer := config.NewMailer()
	err := mailer.SendEmail(to, subject, body)
	return otp, err

}
