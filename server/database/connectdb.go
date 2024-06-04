package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func ConnectDb() *sql.DB{
    err := godotenv.Load()
	if err != nil{
		log.Fatal("error loading the .env file");
	}
	db_url:=os.Getenv("POSTGRES_URL");
    
	println("hello world")
	fmt.Println(db_url);
	db,err := sql.Open("postgres",db_url);

	if err != nil{
		log.Fatal(err);
	}

	fmt.Println("successfully connected to database")

	return db;


}