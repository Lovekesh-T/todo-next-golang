package main

import (
	database "golangserver/database"
	"golangserver/routes"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main(){

db :=database.ConnectDb();
app := chi.NewRouter();
app.Use(middleware.Logger);
app.Use(cors.Handler(cors.Options{
    // AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
    AllowedOrigins:   []string{"https://todo-next-golang.vercel.app"},
    // AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
    AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
    // ExposedHeaders:   []string{"Link"},
    AllowCredentials: true,
    // MaxAge:           300, // Maximum value not ignored by any of major browsers
  }))

app.Get("/",func (res http.ResponseWriter,req *http.Request){
	res.Write([]byte("hello world"));
})

routes.UserRoutes(db,app);
routes.TodoRoutes(db,app);

log.Fatal(http.ListenAndServe(":4000",app))

defer db.Close()

}