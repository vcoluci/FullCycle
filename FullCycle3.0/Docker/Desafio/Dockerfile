#Use image base on Go
FROM golang:1.20-alpine

#define de work dir
WORKDIR /app

#Copy code Go to the container
COPY main.go . 

#build the app
RUN go build -o myapp main.go

#run the app
CMD ["./myapp"]

