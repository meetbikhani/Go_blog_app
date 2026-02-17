package repository

import (
	"blog/internal/domain/models"
	"gorm.io/gorm"
)

type CommentRepository interface {
	Create(comment *models.Comment) error
	FindByBlog(blogID uint) ([]models.Comment, error)
}

type commentRepo struct {
	db *gorm.DB
}

func NewCommentRepository(db *gorm.DB) CommentRepository {
	return &commentRepo{db}
}

func (r *commentRepo) Create(comment *models.Comment) error {
	return r.db.Create(comment).Error
}

func (r *commentRepo) FindByBlog(blogID uint) ([]models.Comment, error) {
	var comments []models.Comment
	err := r.db.Preload("User").
		Where("blog_id = ?", blogID).
		Find(&comments).Error
	return comments, err
}
