build:
	@go build -o bin/main cmd/api/main.go

run: build
	@./bin/main

test:
	@go test -v ./..

dev:
	cd client && pnpm dev

watch:
	  @air
		@echo "Watching...";
