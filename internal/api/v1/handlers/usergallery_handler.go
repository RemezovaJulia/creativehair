package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func AddPhotosGallery(c *gin.Context, app *app.App) {
	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}
	galleryPath := "/public/images/users/" + strconv.Itoa(id) + "/gallery/"
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to process form data"})
		return
	}

	files := form.File["photos"]
	photos := make([]models.Photo, 0, len(files))
	for _, file := range files {
		// Сохранение файла на сервере
		err := c.SaveUploadedFile(file, "internal"+galleryPath+file.Filename)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сохранения файла"})
			return
		}
		photos = append(photos, models.Photo{EmployeeID: id, ImageURL: galleryPath + file.Filename})
	}
	service := services.NewGalleryService(app.DB)
	_, err = service.AddPhotosGallery(c, photos)
	if err != nil {
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Фото успешно сохранены"})
}

func GetUserGallery(c *gin.Context, app *app.App) {
	service := services.NewGalleryService(app.DB)
	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}
	gallery, err := service.GetGalleryByID(context.Background(), id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения фотографий"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"gallery": gallery})
}

func RemovePhoto(c *gin.Context, app *app.App) {
	var ID struct {
		ID int
	}

	if err := c.BindJSON(&ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Неверный запрос"})
		return
	}
	service := services.NewGalleryService(app.DB)
	photoPath, err := service.RemovePhoto(context.Background(), ID.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка удаления фотографии"})
		return
	}
	err = os.Remove("internal" + photoPath)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка удаления фотографии"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Фото успешно удалено", "path": photoPath})
}

func GetUserGalleryByIdHandler(c *gin.Context, app *app.App) {
	var UserID struct {
		ID int `json:"id"`
	}

	if err := c.BindJSON(&UserID); err != nil {
		fmt.Printf("%v\n", err)
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Неверный запрос"})
		return
	}
	service := services.NewGalleryService(app.DB)
	gallery, err := service.GetGalleryByID(context.Background(), UserID.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения фотографий"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"gallery": gallery})

}
