package datastore

import (
	"context"
	"sync"

	"github.com/RemezovaJulia/creativehair/internal/api/v1/models"
	"github.com/RemezovaJulia/creativehair/internal/services"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Cache struct {
	mu        *sync.RWMutex
	schedule  *models.WorkSchedule
	employees []*models.Employee
	pool      *pgxpool.Pool
}

func NewCache(pool *pgxpool.Pool) *Cache {
	mu := &sync.RWMutex{}
	return &Cache{mu: mu, schedule: &models.WorkSchedule{}, pool: pool}
}

func (c *Cache) Schedule() *models.WorkSchedule {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.schedule
}

func (c *Cache) SetSchedule(schedule *models.WorkSchedule) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.schedule = schedule
}

func (c *Cache) LoadSchedule() (*models.WorkSchedule, error) {
	workScheduleService := services.NewWorkScheduleService(c.pool, c.schedule)
	schedule, err := workScheduleService.GetWorkSchedule(1)
	if err != nil {
		return nil, err
	}

	c.mu.Lock()
	c.schedule = schedule
	c.mu.Unlock()

	return c.schedule, nil
}

func (c *Cache) SetEmployee(employees []*models.Employee) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.employees = employees
}

func (c *Cache) LoadEmployees() error {
	service := services.NewEmployeeService(c.pool, &models.Employee{})
	all, err := service.GetAll(context.Background())
	if err != nil {
		return err
	}

	c.mu.Lock()
	c.employees = all
	c.mu.Unlock()
	return nil
}

func (c *Cache) Employees() []*models.Employee {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.employees
}
