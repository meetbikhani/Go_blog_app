package repository

import (
	"blog/internal/domain/models"
	"gorm.io/gorm"
)

type BlogRepository interface {
	Create(blog *models.Blog) error
	FindAll() ([]models.Blog, error)
	FindByUser(userID uint) ([]models.Blog, error)
	FindByID(blogID string) (*models.Blog, error)
}

type blogRepo struct {
	db *gorm.DB
}

func NewBlogRepository(db *gorm.DB) BlogRepository {
	return &blogRepo{db}
}

func (r *blogRepo) Create(blog *models.Blog) error {
	return r.db.Create(blog).Error
}

func (r *blogRepo) FindAll() ([]models.Blog, error) {
	var blogs []models.Blog
	err := r.db.Preload("User").Find(&blogs).Error
	return blogs, err
}

func (r *blogRepo) FindByID(blogID string) (*models.Blog, error) {
	var blog models.Blog
	err := r.db.Preload("User").First(&blog, blogID).Error
	return &blog, err
}

func (r *blogRepo) FindByUser(userID uint) ([]models.Blog, error) {
	var blogs []models.Blog
	err := r.db.Preload("User").Where("user_id = ?", userID).Find(&blogs).Error
	return blogs, err
}
