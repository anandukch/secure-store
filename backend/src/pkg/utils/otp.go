package utils

import (
	"fmt"
	"math/rand"
	"time"
)

func GenerateOTP() string {
	rand.Seed(time.Now().UnixNano())
	otp := rand.Intn(900000) + 100000
	return fmt.Sprintf("%06d", otp)
}

func SendOtp(to string) (string, error) {

	subject := "Your OTP Code"
	otp := GenerateOTP()
	body := fmt.Sprintf("Your OTP code is: %s", otp)
	mailer := NewMailer()
	err := mailer.SendEmail(to, subject, body)
	return otp, err

}
