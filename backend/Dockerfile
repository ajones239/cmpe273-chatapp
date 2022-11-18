FROM golang:latest 

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN go mod download
RUN go build -o api ./

EXPOSE 8000
CMD ["/app/api"]

