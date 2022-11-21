FROM golang:latest 

RUN mkdir /app
ADD . /app
WORKDIR /app

ENV API_PORT "8000"

RUN go mod tidy
RUN go mod download
RUN go build -o api ./

EXPOSE 8000
CMD ["/app/api"]

