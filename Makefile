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
	migrate -path $(MIGRATIONS_FILES_PATH) -database $(DB_URL) up

all-migrate-down:
	@echo "try all migrations down"
	migrate -path $(MIGRATIONS_FILES_PATH) -database $(DB_URL) down