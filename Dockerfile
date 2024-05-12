FROM golang:1.22-alpine

WORKDIR /usr/src/app

COPY go.mod go.sum ./

RUN go mod download

RUN go install github.com/cosmtrek/air@latest

COPY . .

RUN rm -rf extension/ frontend/

RUN go mod tidy