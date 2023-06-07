package services

import (
	"context"
	"database/sql"
	"fmt"
	"image"
	"regexp"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/oliamb/cutter"
	"golang.org/x/crypto/bcrypt"
)

type EmployeeService struct {
	db       *pgxpool.Pool
	employee *models.Employee
}

type CropperData struct {
	Width  int `json:"width"`
	Height int `json:"height"`
	X      int `json:"x"`
	Y      int `json:"y"`
}

func HashPassword(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func CheckPasswordHash(password string, hash []byte) error {
	return bcrypt.CompareHashAndPassword(hash, []byte(password))
}

func NewEmployeeService(db *pgxpool.Pool, employee *models.Employee) *EmployeeService {
	return &EmployeeService{db: db, employee: employee}
}

type Employee struct {
	Login    string `json:"user_login"`
	Password string `json:"user_password"`
	Name     string `json:"user_name"`
	Phone    string `json:"user_phone"`
	Email    string `json:"user_email"`
	About    string `json:"user_about"`
	RoleId   int    `json:"user_role"`
}

func (s *EmployeeService) CreateEmployee(ctx context.Context, employee Employee, creator int) error {
	var id int

	hashPassword, err := HashPassword(employee.Password)
	if err != nil {
		return err
	}

	s.employee.Password = hashPassword
	err = s.db.QueryRow(ctx, `
		INSERT INTO employees (login, password, name, phone, email, about, role_id, created_by)
		            
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id
	`, employee.Login, hashPassword,
		employee.Name, employee.Phone,
		employee.Email, employee.About, employee.RoleId, creator,
	).Scan(&id)
	if err != nil {
		return err
	}
	err = s.db.QueryRow(ctx, `
		INSERT INTO employee_photos ( employee_id, image_url)
		            
		VALUES ($1, $2)
		RETURNING id
	`, id, "").Scan(&id)
	if err != nil {
		fmt.Printf("%v\n", err)
		return err
	}
	return nil
}

func (s *EmployeeService) GetEmployeeById(ctx context.Context, id int) (*models.Employee, error) {
	err := s.db.QueryRow(ctx, `SELECT * FROM employees WHERE id = $1`, &id).Scan(
		&s.employee.Id, &s.employee.Login, &s.employee.Password,
		&s.employee.Name, &s.employee.Phone, &s.employee.Email, &s.employee.About, &s.employee.RoleId,
		&s.employee.CreatedBy, &s.employee.HireDate, &s.employee.DismissalDate, &s.employee.Active,
		&s.employee.TotalEarnings,
	)
	if err != nil {
		return nil, err
	}
	return s.employee, nil
}

func (s *EmployeeService) GetEmployeeByLogin(ctx context.Context, login string) (*models.Employee, error) {
	query := `SELECT e.*, ep.image_url 
				FROM employees e LEFT JOIN employee_photos ep ON e.id = ep.employee_id
				WHERE e.login = $1
	`
	row := s.db.QueryRow(ctx, query, login)
	var photo sql.NullString
	err := row.Scan(
		&s.employee.Id, &s.employee.Login, &s.employee.Password,
		&s.employee.Name, &s.employee.Phone, &s.employee.Email, &s.employee.About, &s.employee.RoleId,
		&s.employee.CreatedBy, &s.employee.HireDate, &s.employee.DismissalDate,
		&s.employee.Active, &s.employee.TotalEarnings, &photo,
	)
	s.employee.Photo.String = photo.String
	if err != nil && err != pgx.ErrNoRows {
		return nil, err
	}

	return s.employee, nil
}
func (s *EmployeeService) FriedEmployeeById(ctx context.Context, id int) error {
	_, err := s.db.Exec(ctx, `UPDATE employees SET active = false WHERE id = $1`, &id)
	if err != nil {
		return err
	}
	return nil
}

func (s *EmployeeService) RevertEmployeeById(ctx context.Context, id int) error {
	_, err := s.db.Exec(ctx, `UPDATE employees SET active = true WHERE id = $1`, &id)
	if err != nil {
		return err
	}
	return nil
}

func (s *EmployeeService) UpdateEmployeeById(ctx context.Context, id int) (int, error) {
	query := `
        UPDATE employees SET 
            login = $1, 
            password = $2, 
            name = $3, 
            phone = $4, 
            email = $5 
        WHERE id = $6
    `
	_, err := s.db.Exec(ctx, query,
		&s.employee.Login,
		&s.employee.Password,
		&s.employee.Name,
		&s.employee.Phone,
		&s.employee.Email,
		&id,
	)
	if err != nil {
		return 0, err
	}
	return id, nil
}

func (s *EmployeeService) UpdateEmployeeData(ctx context.Context, id int, name, phone, email, pass *string) (*models.Employee, error) {
	query := `UPDATE employees SET`

	params := make([]interface{}, 0)

	index := 1

	if name != nil {
		query += ` name = $` + strconv.Itoa(index) + `,`
		params = append(params, *name)
		s.employee.Name = *name
		index++
	}
	if phone != nil {
		query += ` phone = $` + strconv.Itoa(index) + `,`
		params = append(params, *phone)
		s.employee.Phone = *phone
		index++
	}
	if email != nil {
		query += ` email = $` + strconv.Itoa(index) + `,`
		params = append(params, *email)
		s.employee.Email = *email
		index++
	}
	if pass != nil {
		query += ` password = $` + strconv.Itoa(index) + `,`
		password, err := HashPassword(*pass)
		if err != nil {
			return nil, err
		}
		params = append(params, password)
		index++
	}

	query = strings.TrimSuffix(query, ",") // Удаление последней запятой

	query += ` WHERE id = $` + strconv.Itoa(index)
	params = append(params, id)

	_, err := s.db.Exec(ctx, query, params...)
	return s.employee, err
}

func (s *EmployeeService) GetAll(ctx context.Context) ([]*models.Employee, error) {
	query := `SELECT e.*, ep.image_url 
			FROM employees e LEFT JOIN employee_photos ep ON e.id = ep.employee_id
			WHERE e.role_id = $1 AND e.active = true`
	rows, err := s.db.Query(ctx, query, 1)
	defer rows.Close()

	if err != nil {
		return nil, err
	}

	var employees []*models.Employee
	for rows.Next() {
		employee := &models.Employee{}
		err := rows.Scan(
			&employee.Id, &employee.Login, &employee.Password,
			&employee.Name, &employee.Phone, &employee.Email, &employee.About, &employee.RoleId,
			&employee.CreatedBy, &employee.HireDate, &employee.DismissalDate,
			&employee.Active, &employee.TotalEarnings, &employee.Photo,
		)
		if err != nil {
			return nil, err
		}

		if !employee.Photo.Valid {
			employee.Photo.String = "public/images/no-avatar.jpg"
			employee.Photo.Valid = true
		}
		if !employee.About.Valid {
			employee.About.String = ""
			employee.About.Valid = true
		}
		employees = append(employees, employee)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return employees, nil
}

func (s *EmployeeService) EmployeeImageCropper(img image.Image, data CropperData) (image.Image, error) {
	cropper, err := cutter.Crop(img, cutter.Config{
		Width:  data.Width,
		Height: data.Height,
		Anchor: image.Point{X: data.X, Y: data.Y},
	})

	if err != nil {
		return nil, err
	}

	return cropper, nil
}

func (s *EmployeeService) UpdateEmployeeAvatar(ctx context.Context, id int, url string) error {
	query := `
        UPDATE employee_photos SET 
           image_url = $1
        WHERE employee_id = $2
    `
	_, err := s.db.Exec(ctx, query,
		&url,
		&id,
	)

	return err
}

func (s *EmployeeService) GetAllEmployee(ctx context.Context) ([]*models.Employee, error) {
	query := `SELECT * FROM employees`
	rows, err := s.db.Query(ctx, query)
	defer rows.Close()
	if err != nil {
		return nil, err
	}

	var employees []*models.Employee

	for rows.Next() {
		employee := &models.Employee{}
		err := rows.Scan(
			&employee.Id, &employee.Login, &employee.Password,
			&employee.Name, &employee.Phone, &employee.Email, &employee.About, &employee.RoleId,
			&employee.CreatedBy, &employee.HireDate, &employee.DismissalDate,
			&employee.Active, &employee.TotalEarnings,
		)
		if err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}

	return employees, nil
}

func (s *EmployeeService) EmailValidator(email string) bool {
	regex := regexp.MustCompile(`^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]+$`)

	if !regex.MatchString(email) {
		return false
	}

	return true
}

func (s *EmployeeService) PhoneValidator(phone string) bool {
	regex := regexp.MustCompile(`^\+7\(\d+\)-\d{3}-\d{2}-\d{2}$`)

	if !regex.MatchString(phone) {
		return false
	}

	return true
}

func (s *EmployeeService) NewPassValidator(pass string) bool {
	if utf8.RuneCountInString(pass) < 5 {
		return false
	}

	return true
}
