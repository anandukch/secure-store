FROM golang:1.22-alpine

WORKDIR /usr/src/app

# Copy only the necessary files for dependency download and building.
COPY go.mod go.sum ./

# Download dependencies.
RUN go mod download

# Install necessary tools.
RUN go install github.com/cosmtrek/air@latest

# Copy the rest of the source code.
COPY . .

# Clean up unwanted directories.
RUN rm -rf extension/ frontend/

# Clean up and tidy Go modules (optional).
RUN go mod tidy