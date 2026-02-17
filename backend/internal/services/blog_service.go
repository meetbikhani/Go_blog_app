package services

import (
	"blog/internal/domain/models"
	"blog/internal/repository"
)

type BlogService struct {
	repo repository.BlogRepository
}

func NewBlogService(r repository.BlogRepository) *BlogService {
	return &BlogService{r}
}

func (s *BlogService) Create(title, content string, userID uint, image string) (*models.Blog, error) {
	blog := &models.Blog{
		Title:   title,
		Content: content,
		UserID:  userID,
		Image: image,
	}

	err := s.repo.Create(blog)
	return blog, err
}

func (s *BlogService) GetAll() ([]models.Blog, error) {
	return s.repo.FindAll()
}

func (s *BlogService) GetByUser(userID uint) ([]models.Blog, error) {
	return s.repo.FindByUser(userID)
}

func (s *BlogService) GetByID(blogID string) (*models.Blog, error) {
	return s.repo.FindByID(blogID)
}
