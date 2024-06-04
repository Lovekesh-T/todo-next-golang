package middleware

import (
	"context"
	api "golangserver/utils"
	"net/http"
)


func Authentication(next http.Handler) http.Handler{

	return http.HandlerFunc(func(res http.ResponseWriter,req *http.Request){
		token := req.Header.Get("Authorization");
		if token == ""{
			api.Json[string](res,api.Response[string]{
				Message: "token is required",
				StatusCode: 403,
				Success: false,
			})

			return;


		}

		 user,err := api.VerifyJWT(token);
         
		 if err !=nil{
			api.Json(res,api.Response[interface{}]{
				Message: "Token is invalid or expired",
				StatusCode: 401,
				Success: false,
			})

			return
		 }
         
		 ctx := context.WithValue(req.Context(),"user",user);

		 next.ServeHTTP(res,req.WithContext(ctx));
	})

}