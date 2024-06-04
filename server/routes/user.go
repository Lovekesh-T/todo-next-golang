package routes

import (
	"database/sql"
	controller "golangserver/controllers"
	"golangserver/middleware"
	api "golangserver/utils"

	"github.com/go-chi/chi/v5"
)




func UserRoutes(db *sql.DB,router chi.Router){

    router.Route("/api/v1/users",func(router chi.Router){
		router.Post("/signup",api.CatchError(controller.SignUp(db)));
		router.Post("/signin",api.CatchError(controller.SignIn(db)));
		router.With(middleware.Authentication).Get("/me",api.CatchError(controller.GetUser(db)));
	})

}