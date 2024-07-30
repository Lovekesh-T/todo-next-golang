package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	helper "golangserver/helpers"
	model "golangserver/models"
	api "golangserver/utils"
	"net/http"
	"time"
)


func SignUp(db *sql.DB ) http.HandlerFunc{

	return func (res http.ResponseWriter,req *http.Request){
		var user model.User;
	
		json.NewDecoder(req.Body).Decode(&user);
	
		fmt.Printf("%#v",user);

		if (user.Email == "" || user.Password == "" || user.Name == ""){
			panic(api.Error("All Inputs Required",400))
		}
         
		fmt.Println("hellow there")
		var userExist model.User;
		result :=db.QueryRow("SELECT email FROM users WHERE email = $1",user.Email);
         fmt.Println("inside result")
		result.Scan(&userExist.Email);

		fmt.Println(userExist.Email)

		if userExist.Email != ""{
			panic(api.Error("User already exits with that email",400));
		}

		hashedPassword,err := helper.HashPassword(user.Password);

		if err != nil{
			panic(err)
		}

		user.Password = hashedPassword;



		_,er := db.Exec("INSERT INTO users (name,email,password) VALUES ($1, $2, $3)",user.Name,user.Email,user.Password);

		if er != nil{
			panic(er);
		}
		
		api.Json(res,api.Response[string]{
			Message: "user created successfully",
			Success: true,
			StatusCode: 201,
			Data: "Sign up successfull",
		})
	}
}


func SignIn(db *sql.DB) http.HandlerFunc{

	return func (res http.ResponseWriter,req *http.Request){

		var user model.User;
	
		e := json.NewDecoder(req.Body).Decode(&user);

		if e != nil{
			panic(e);
		}
	
		fmt.Printf("%#v",user);
         
		var fetchedUser model.User;
		row := db.QueryRow("SELECT email,password,name,id FROM users WHERE email = $1",user.Email);

        err := row.Scan(&fetchedUser.Email,&fetchedUser.Password,&fetchedUser.Name,&fetchedUser.Id);

		if err !=nil{

			if err == sql.ErrNoRows {
				 panic(api.Error("email or password is incorrect",400));
			}
			panic(err)
		}

		
		if(fetchedUser.Id == 0){
			panic(api.Error("Email or Password is incorrect",400));
		}

		match := helper.VerifyPassword(user.Password,fetchedUser.Password);
        
		if !match {
			panic(api.Error("Email or Password is incorrect",400))
		}

 
		fmt.Printf("%#v",fetchedUser);
         
		token := api.GenerateJWT(fetchedUser);
		cookie := http.Cookie{
			Name: "token",
			Value: token,
			Expires:  time.Now().Add(48 * time.Hour), // Cookie expires in 24 hours
			HttpOnly: true,
			Path: "/",
			SameSite: 4,
			Secure: true,
			Domain: "todo-client-lfng.onrender.com",

		}

		http.SetCookie(res,&cookie);
		
		api.Json(res,api.Response[string]{
			Message: "User Sign in Successfully",
			Success: true,
			StatusCode: 200,
			Data: token,
		})
	
	
	}
}

func GetUser(db *sql.DB)http.HandlerFunc{

	return func(res http.ResponseWriter,req *http.Request){
		user := req.Context().Value("user").(model.User)


		 fmt.Printf("%#v",user);
         

		 api.Json(res,api.Response[model.User]{
			Message: "User Fetched Successfully",
			Success: true,
			StatusCode: 200,
			Data: user,
		})

	}

}