package handlers

import (
	"blog/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CommentHandler struct {
	service *services.CommentService
}

func NewCommentHandler(service *services.CommentService) *CommentHandler {
	return &CommentHandler{service: service}
}


func (h *CommentHandler) Add(c *gin.Context) {

	var req struct {
		Content string `json:"content" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	blogIDParam := c.Param("blogId")
	blogIDUint, err := strconv.ParseUint(blogIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid blog ID",
		})
		return
	}

	userID := c.MustGet("user_id").(uint)

	err = h.service.Add(req.Content, userID, uint(blogIDUint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Comment added successfully",
	})
}


func (h *CommentHandler) GetByBlog(c *gin.Context) {

	blogIDParam := c.Param("blogId")
	blogIDUint, err := strconv.ParseUint(blogIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid blog ID",
		})
		return
	}

	comments, err := h.service.GetByBlog(uint(blogIDUint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, comments)
}
