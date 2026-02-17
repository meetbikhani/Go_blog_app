package services

import (
	"blog/internal/domain/models"
	"blog/internal/repository"
)

type CommentService struct {
	repo repository.CommentRepository
}

func NewCommentService(r repository.CommentRepository) *CommentService {
	return &CommentService{r}
}

func (s *CommentService) Add(content string, userID, blogID uint) error {
	comment := &models.Comment{
		Content: content,
		UserID:  userID,
		BlogID:  blogID,
	}
	return s.repo.Create(comment)
}

func (s *CommentService) GetByBlog(blogID uint) ([]models.Comment, error) {
	return s.repo.FindByBlog(blogID)
}
