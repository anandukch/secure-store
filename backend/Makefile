

# Help target: display available commands
help:
	@echo "Available make commands:"
	@echo "  make migrate-up       : Apply all pending migrations"
	@echo "  make migrate-down     : Rollback the last migration"
	@echo "  make create-migration : Create a new migration file"
	@echo "  make status           : Check the migration status"
	@echo "  make reset            : Reset the database (rollback all and migrate up)"

server: ## Run the server
	@go run src/main.go

# Build the Go binary (for future use)
build: ## Build the Go binary
	@go build -o dist/server ./src

server-dev: ## Run the server in development mode
	@air -c .air.toml
# Run Go tests (for future use)
test: ## Run Go tests
	@go test ./...

up:
	@docker compose up -d

compose-dev:
	@docker compose --profile file-vault up --build 

down:
	@docker compose down
	
docker-build:
	@docker compose up --build

# Clean up Go build artifacts (for future use)
clean: ## Clean up Go build artifacts
	@go clean


