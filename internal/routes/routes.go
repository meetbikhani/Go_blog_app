package routes

import (
	"blog/internal/handlers"
	middleware "blog/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine,
	auth *handlers.AuthHandler,
	blog *handlers.BlogHandler,
	comment *handlers.CommentHandler,
	health *handlers.HealthHandler,
) {

	r.GET("/health", health.HealthCheck)
	r.POST("/register", auth.Register)
	r.POST("/login", auth.Login)
	r.POST("/logout", auth.Logout)

	api := r.Group("/api")
	api.Use(middleware.AuthMiddleware())

	api.POST("/blogs", blog.Create)
	api.GET("/blogs", blog.GetAll)
	api.GET("/blogs/:blog_id", blog.GetByID)
	api.GET("/blogs/user", blog.GetByUser)

	api.POST("/comments/:blogId", comment.Add)
	api.GET("/comments/:blogId", comment.GetByBlog)
}
