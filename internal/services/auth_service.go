package services

import (
	"blog/internal/domain/models"
	"blog/internal/repository"
	"blog/internal/config"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type AuthService struct {
	userRepo repository.UserRepository
}

func NewAuthService(u repository.UserRepository) *AuthService {
	return &AuthService{u}
}

func (s *AuthService) Register(name, email, password string) error {
	hash, _ := bcrypt.GenerateFromPassword([]byte(password), 14)

	user := models.User{
		Name:     name,
		Email:    email,
		Password: string(hash),
	}

	return s.userRepo.Create(&user)
}

func (s *AuthService) Login(email, password string) (string, error) {
	user, err := s.userRepo.FindByEmail(email)
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", err
	}

	cfg := config.Get()

	expirationTime := time.Now().Add(
		time.Duration(cfg.JWTExpireSeconds) * time.Second,
	)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     expirationTime.Unix(),
	})

	return token.SignedString([]byte(cfg.JWTSecret))
}

