package main

import (
	"blog/internal/config"
	"blog/internal/domain/models"
	"blog/internal/handlers"
	"blog/internal/repository"
	"blog/internal/routes"
	"blog/internal/services"
	"blog/pkg/database"

	"github.com/gin-gonic/gin"
)

func main() {

	config.Load()
	cfg := config.Get()

	db, _ := database.Init(cfg.DBDSN)

	db.AutoMigrate(&models.User{}, &models.Blog{}, &models.Comment{})

	userRepo := repository.NewUserRepository(db)
	blogRepo := repository.NewBlogRepository(db)
	commentRepo := repository.NewCommentRepository(db)

	authService := services.NewAuthService(userRepo)
	blogService := services.NewBlogService(blogRepo)
	commentService := services.NewCommentService(commentRepo)

	authHandler := handlers.NewAuthHandler(authService)
	blogHandler := handlers.NewBlogHandler(blogService)
	commentHandler := handlers.NewCommentHandler(commentService)
	healthHandler := handlers.NewHealthHandler()

	r := gin.Default()

	routes.SetupRoutes(r, authHandler, blogHandler, commentHandler, healthHandler)

	r.Run(":" + cfg.AppPort)
}
