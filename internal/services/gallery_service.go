package services

import (
	"context"
	"fmt"
	"strconv"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type GalleryService struct {
	db *pgxpool.Pool
}

func NewGalleryService(db *pgxpool.Pool) *GalleryService {
	return &GalleryService{db: db}
}

func (s *GalleryService) AddPhotosGallery(ctx context.Context, photos []models.Photo) (int, error) {
	tx, err := s.db.Begin(ctx)

	if err != nil {
		return 0, err
	}
	stmt, err := tx.Prepare(ctx, "insert_photo", `
			INSERT INTO employee_gallery (employee_id, image_url)
			VALUES ($1, $2)
			RETURNING id
	`)

	if err != nil {
		return 0, err
	}
	for _, photo := range photos {
		var photoID int
		err = tx.QueryRow(ctx, stmt.Name, strconv.Itoa(photo.EmployeeID), photo.ImageURL).Scan(&photoID)
		if err != nil {
			err := tx.Rollback(ctx)
			if err != nil {
				return 0, err
			}
			return 0, err
		}
	}
	err = tx.Commit(ctx)
	if err != nil {
		return 0, err
	}

	return 0, nil
}

func (s *GalleryService) GetGalleryByID(ctx context.Context, id int) ([]models.Photo, error) {
	query := `SELECT * FROM employee_gallery WHERE employee_id = $1`
	rows, err := s.db.Query(ctx, query, id)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	photos := make([]models.Photo, 0)
	for rows.Next() {
		photo := models.Photo{}
		err := rows.Scan(&photo.ID, &photo.EmployeeID, &photo.ImageURL)
		if err != nil {
			return nil, err
		}
		photos = append(photos, photo)
	}

	return photos, nil
}

func (s *GalleryService) GetGallery(ctx context.Context) ([]models.Photo, error) {
	query := `SELECT * FROM employee_gallery`
	rows, err := s.db.Query(ctx, query)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	photos := make([]models.Photo, 0)
	for rows.Next() {
		photo := models.Photo{}
		err := rows.Scan(&photo.ID, &photo.EmployeeID, &photo.ImageURL)
		if err != nil {
			return nil, err
		}
		photos = append(photos, photo)
	}

	return photos, nil
}

func (s *GalleryService) RemovePhoto(ctx context.Context, id int) (string, error) {
	var filePath string
	query := `SELECT image_url FROM employee_gallery WHERE id = $1`
	err := s.db.QueryRow(ctx, query, id).Scan(&filePath)
	if err != nil {
		if err == pgx.ErrNoRows {
			return "", fmt.Errorf("photo not found")
		}
		return "", err
	}

	query = `DELETE FROM employee_gallery WHERE id = $1`
	_, err = s.db.Exec(ctx, query, id)
	if err != nil {
		return "", err
	}
	return filePath, nil
}
