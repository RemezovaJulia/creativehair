include .env
go-build:
	@echo "  >  Building binary to $(GO_BIN)"
	@GOPATH='$(GOPATH)' GO_BIN=$(GO_BIN) go build -o $(GO_BIN) $(GO_FILES)
