build:
	@go build -o bin/go-blind

run: build
	@./bin/go-blind

test:
	@go test -v ./..


