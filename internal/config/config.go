package config

import (
	"os"
	"github.com/joho/godotenv"
	"strconv"
)

type Config struct {
	AppPort   string
	DBDSN     string
	JWTSecret string
	JWTExpireSeconds int
	IsProd    bool
}

var cfg *Config

func Load() error {
	_ = godotenv.Load()

	expireStr := os.Getenv("JWT_EXPIRE_SECONDS")

	expireSeconds, err := strconv.Atoi(expireStr)
	if err != nil {
		return err
	}

	cfg = &Config{
		AppPort:   os.Getenv("APP_PORT"),
		DBDSN:     os.Getenv("DB_DSN"),
		JWTSecret: os.Getenv("JWT_SECRET"),
		JWTExpireSeconds: expireSeconds,
		IsProd:     os.Getenv("IS_PROD") == "true",
	}
	return nil
}

func Get() *Config {
	return cfg
}