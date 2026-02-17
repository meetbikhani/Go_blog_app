package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Content string `json:"content"`
	UserID  uint   `json:"user_id"`
	BlogID  uint   `json:"blog_id"`
	User    User   `json:"user"`
}
