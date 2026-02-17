package handlers

import (
	"blog/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BlogHandler struct {
	service *services.BlogService
}

func NewBlogHandler(service *services.BlogService) *BlogHandler {
	return &BlogHandler{service: service}
}

func (h *BlogHandler) Create(c *gin.Context) {

	var req struct {
		Title   string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
		Image   string `json:"image" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID := c.MustGet("user_id").(uint)

	blog, err := h.service.Create(req.Title, req.Content, userID, req.Image)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, blog)
}

func (h *BlogHandler) GetByUser(c *gin.Context) {

	userID := c.MustGet("user_id").(uint)

	blogs, err := h.service.GetByUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, blogs)
}

func (h *BlogHandler) GetByID(c *gin.Context) {

	blogID := c.Param("blog_id")

	blog, err := h.service.GetByID(blogID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, blog)
}

func (h *BlogHandler) GetAll(c *gin.Context) {

	blogs, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, blogs)
}
