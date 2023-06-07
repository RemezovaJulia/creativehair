package main

import (
	"fmt"

	"github.com/RemezovaJulia/creativehair/internal/app"
	"github.com/RemezovaJulia/creativehair/internal/app/registry"
	"github.com/RemezovaJulia/creativehair/internal/config"
)

func main() {
	cfg, err := config.NewConfig()
	if err != nil {
		fmt.Printf("%v", err)
		return
	}

	application, err := app.NewApp(cfg)
	defer application.DB.Close()
	if err != nil {
		return
	}
	registry.RegisterRoutes(application)

	if err := application.Run(); err != nil {
		fmt.Printf("%v", err)
		return
	}
}
