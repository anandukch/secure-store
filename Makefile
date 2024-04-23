build:
	go build -o main ./src

run: build
	./main

watch:
	reflex -s -r '\.go$$' make run