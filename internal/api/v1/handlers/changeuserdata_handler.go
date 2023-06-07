package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func CompareOldPasswordHandler(c *gin.Context, app *app.App) {
	var OldPassword struct {
		OldPassword string `json:"old_password" binding:"required"`
	}

	if err := c.BindJSON(&OldPassword); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "старый пароль не соответствует структуре"})
		return
	}

	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}

	employeeService := services.NewEmployeeService(app.DB, &models.Employee{})
	employee, err := employeeService.GetEmployeeById(context.Background(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
		return
	}

	err = services.CheckPasswordHash(OldPassword.OldPassword, employee.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный старый пароль"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ок"})
}

func UploadAvatarHandler(c *gin.Context, app *app.App) {
	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}
	avatarPath := "/public/images/users/" + strconv.Itoa(id) + "/photo/"
	// Получение файла из запроса
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка получения файла"})
		return
	}

	err = filepath.Walk("internal"+avatarPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			err := os.Remove(path)
			if err != nil {
				fmt.Printf("1 %v\n", err)
				c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка Сохранение файла"})
				return nil
			}
		}
		return nil
	})

	// Сохранение файла
	err = c.SaveUploadedFile(file, "internal"+avatarPath+file.Filename)
	if err != nil {
		fmt.Printf("3 %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сохранения файла"})
		return
	}

	// Получение данных из запроса
	var data services.CropperData
	jsonData := c.PostForm("data")
	err = json.Unmarshal([]byte(jsonData), &data)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка получения данных"})
		return
	}

	f, err := os.Open("internal" + avatarPath + file.Filename)
	defer func(f *os.File) {
		err := f.Close()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка открытия фото"})
		}
	}(f)

	if err != nil {
		fmt.Printf("file not uploaded %v\n", err)
	}

	img, _, err := image.Decode(f)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot decode image"})
		return
	}

	employeeService := services.NewEmployeeService(app.DB, &models.Employee{})

	cropper, err := employeeService.EmployeeImageCropper(img, data)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка редактирования фото"})
		return
	}

	newAvatar := fmt.Sprintf("%s%s", avatarPath, file.Filename)
	outputFile, err := os.Create("internal" + newAvatar)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сохранения отредактированного фото"})
		return
	}

	defer func(outputFile *os.File) {
		err := outputFile.Close()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка закрытия файла"})
		}
	}(outputFile)

	// Определяем формат изображения по расширению файла
	ext := filepath.Ext(outputFile.Name())
	switch ext {
	case ".jpg", ".jpeg":
		err = jpeg.Encode(outputFile, cropper, nil) // Сохраняем в формате JPEG
	case ".png":
		err = png.Encode(outputFile, cropper) // Сохраняем в формате PNG
	default:
		println("Не поддерживаемый формат фото")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка не верный формат фото"})
		return
	}

	err = employeeService.UpdateEmployeeAvatar(context.Background(), id, newAvatar)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка обновления аватара"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"photo": newAvatar,
	})
}

func ChangeUserDataHandler(c *gin.Context, app *app.App) {
	var UserData struct {
		OldPassword *string `json:"old_pass,omitempty"`
		NewPassword *string `json:"new_pass,omitempty"`
		Name        *string `json:"name,omitempty"`
		Phone       *string `json:"phone,omitempty"`
		Email       *string `json:"email,omitempty"`
		About       *string `json:"about,omitempty"`
	}

	if err := c.ShouldBindJSON(&UserData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка при получении данных"})
		return
	}

	employeeService := services.NewEmployeeService(app.DB, &models.Employee{})
	if UserData.Email != nil {
		if !employeeService.EmailValidator(*UserData.Email) {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Некорректный email"})
			return
		}
	}
	if UserData.Phone != nil {
		if !employeeService.PhoneValidator(*UserData.Phone) {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Некорректный Телефон"})
			return
		}
	}
	if UserData.NewPassword != nil {
		if !employeeService.NewPassValidator(*UserData.NewPassword) {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Некорректный Новый пароль"})
			return
		}
	}

	session := sessions.Default(c)
	userID := session.Get("user_id")
	id, ok := userID.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Пройдите повторно авторизацию"})
		return
	}

	// Старый пароль
	if UserData.OldPassword != nil {
		employee, err := employeeService.GetEmployeeById(context.Background(), id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера"})
			return
		}

		err = services.CheckPasswordHash(*UserData.OldPassword, employee.Password)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный старый пароль"})
			return
		}
	}
	employee, err := employeeService.UpdateEmployeeData(context.Background(),
		id, UserData.Name, UserData.Phone, UserData.Email, UserData.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сервера при обновлении данных"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"name":  employee.Name,
		"phone": employee.Phone,
		"email": employee.Email,
		"about": employee.About,
	})
}
