package routes

import (
	"blog/internal/handlers"
	middleware "blog/internal/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(
	auth *handlers.AuthHandler,
	blog *handlers.BlogHandler,
	comment *handlers.CommentHandler,
	health *handlers.HealthHandler,
) *gin.Engine {

	r := gin.Default()
	r.SetTrustedProxies(nil)

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/health", health.HealthCheck)

	authRoutes := r.Group("/auth")
	{
		authRoutes.POST("/register", auth.Register)
		authRoutes.POST("/login", auth.Login)
		authRoutes.POST("/logout", auth.Logout)
	}

	api := r.Group("/api/v1")
	api.Use(middleware.AuthMiddleware())
	{
		api.GET("/user", auth.GetCurrentUser)

		blogs := api.Group("/blogs")
		{
			blogs.POST("", blog.Create)
			blogs.GET("", blog.GetAll)
			blogs.GET("/:blog_id", blog.GetByID)
			blogs.GET("/user", blog.GetByUser)
		}

		comments := api.Group("/comments")
		{
			comments.POST("/:blogId", comment.Add)
			comments.GET("/:blogId", comment.GetByBlog)
		}
	}

	return r
}