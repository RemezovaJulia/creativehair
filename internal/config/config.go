package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBName   string
	DBUser   string
	DBPass   string
	DBHost   string
	DBPort   string
	APPAddr  string
	APPPort  string
	SMTPPort string
	SMTPHost string
	SMTPUser string
	SMTPPass string
}

func NewConfig() (*Config, error) {
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	return &Config{
		DBName:   os.Getenv("DB_NAME"),
		DBUser:   os.Getenv("DB_LOGIN"),
		DBPass:   os.Getenv("DB_PASSWORD"),
		DBHost:   os.Getenv("DB_HOST"),
		DBPort:   os.Getenv("DB_PORT"),
		APPAddr:  os.Getenv("APP_ADDR"),
		APPPort:  os.Getenv("APP_PORT"),
		SMTPHost: os.Getenv("SMTP_HOST"),
		SMTPPort: os.Getenv("SMTP_PORT"),
		SMTPUser: os.Getenv("SMTP_USERNAME"),
		SMTPPass: os.Getenv("SMTP_PASSWORD"),
	}, nil
}
