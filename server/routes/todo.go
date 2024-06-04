package routes

import (
	"database/sql"

	controller "golangserver/controllers"
	"golangserver/middleware"
	api "golangserver/utils"

	"github.com/go-chi/chi/v5"
)



func TodoRoutes(db *sql.DB,router chi.Router){
   
	router.Route("/api/v1/todos",func (router chi.Router){
		router.Use(middleware.Authentication);
		router.Get("/all",api.CatchError(controller.GetAllTodo(db)));
		router.Post("/create",api.CatchError(controller.CreateTodo(db)));
	    
		router.Route("/{todo_id}",func (router chi.Router){
			router.Get("/",api.CatchError(controller.GetTodo(db)));
			router.Delete("/",api.CatchError(controller.DeleteTodo(db)));
			router.Patch("/",api.CatchError(controller.UpdateTodo(db)));
		})
	})


}


