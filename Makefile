build:
	@go build -o bin/main cmd/api/main.go

run: build
	@./bin/main

test:
	@go test -v ./..

watch:
		@air
		@echo "Watching...";


dev:
	cd client && pnpm dev

