# ---- BUILD STAGE ----
    FROM golang:1.23-alpine AS build

    # Install git for dependency fetching
    RUN apk add --no-cache git
    
    # Set working directory
    WORKDIR /usr/src/app
    
    # Copy Go module files and download dependencies
    COPY go.mod go.sum ./
    RUN go mod download
    
    # Copy source code
    COPY . .
    
    # Set working directory to src
    WORKDIR /usr/src/app/src
    
    # Build the binary (optimize for small size)
    RUN go build -o /app/main main.go
    
    # ---- RUN STAGE ----
    FROM alpine:latest
    
    # Install SSL certificates (needed for HTTPS and secure connections)
    RUN apk --no-cache add ca-certificates
    
    # Set working directory
    WORKDIR /app
    
    # Copy the compiled binary from the build stage
    COPY --from=build /app/main .
    
    # Expose the server port
    EXPOSE 8080
    
    # Run the binary
    CMD ["./main"]
    