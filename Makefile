include .env

go-build:
	@echo ">  Building binary to $(GO_BIN)"
ifeq ($(OS),Windows_NT)
	@set GOPATH=%GOPATH% & set GO_BIN=$(GO_BIN) & go build -o $(GO_BIN) $(GO_FILES)
else
	@GOPATH='$(GOPATH)' GO_BIN=$(GO_BIN) go build -o $(GO_BIN) $(GO_FILES)
endif

all-migrate-up:
	@echo "try all migrations up"
	migrate -path "$(MIGRATIONS_FILES_PATH)" -database $(DB_URL) up

all-migrate-down:
	@echo "try all migrations down"
	migrate -path "$(MIGRATIONS_FILES_PATH)" -database $(DB_URL) down

add-fake-user-up:
	@echo "try add fake user up"
ifeq ($(OS),Windows_NT)
	"$(MIGRATIONS_FILES_PATH)/add_fake_empl/./employee_faker.exe" -env="./.env" -add
else
	"$(MIGRATIONS_FILES_PATH)/add_fake_empl/./employee_faker" -env="./.env" -add
endif


add-fake-user-down:
	@echo "try add fake user down"
ifeq ($(OS),Windows_NT)
	"$(MIGRATIONS_FILES_PATH)/add_fake_empl/./employee_faker.exe" -env="./.env" -rm
else
	"$(MIGRATIONS_FILES_PATH)/add_fake_empl/./employee_faker" -env="./.env" -rm
endif