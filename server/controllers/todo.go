package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	model "golangserver/models"
	api "golangserver/utils"
	"strconv"
	"strings"

	// model "golangserver/models"
	"net/http"

	"github.com/go-chi/chi/v5"
)



func GetTodo(db *sql.DB) http.HandlerFunc{
	return func (res http.ResponseWriter, req *http.Request){


         todoid := chi.URLParam(req,"todo_id");
          
		 id,err := strconv.Atoi(todoid);

		 if err !=nil{
			panic(api.Error("todo id is invalid",400));
		 }
		 var todo model.Todo;
		 scanErr := db.QueryRow("SELECT * FROM todos WHERE todoid = $1",id).Scan(&todo.Completed,&todo.Description,&todo.Title,&todo.TodoId,&todo.UserId);


		 if scanErr !=nil{
			if scanErr == sql.ErrNoRows{
				panic(api.Error("todo not found",404));
			}else{
				panic(scanErr)
			}
		 }


		 api.Json(res,api.Response[model.Todo]{
            Message: "Todo fetched successfully",
			Success: true,
			StatusCode: 200,
			Data: todo,
		 })




	}
}
func GetAllTodo(db *sql.DB) http.HandlerFunc{
	return func (res http.ResponseWriter, req *http.Request){

		user_id := req.URL.Query().Get("user_id");

		if(user_id == ""){
             panic(api.Error("query params is missing",400));
		}
		
		rows,err := db.Query("SELECT * FROM todos WHERE userid = $1",user_id);
         
         if err != nil{
			panic(err)
		 }

		 defer rows.Close()

		var todos []model.Todo;

		for rows.Next(){
			var todo model.Todo;

			rows.Scan(&todo.Completed,&todo.Description,&todo.Title,&todo.TodoId,&todo.UserId);

			todos = append(todos,todo);
		}

		api.Json(res,api.Response[[]model.Todo]{
			Message: "todos fetched successfully",
			StatusCode: 200,
			Success: true,
			Data: todos,
		})
		
	
	}
}


func CreateTodo(db *sql.DB) http.HandlerFunc{
	return func(res http.ResponseWriter, req *http.Request){

		user := req.Context().Value("user").(model.User);


		var todo model.Todo;
	
		decodeErr := json.NewDecoder(req.Body).Decode(&todo)
	
		if decodeErr !=nil{
			panic(decodeErr);
		}

		fmt.Printf("the todo is %#v",todo)

		if (todo.Title == "" || todo.Description == "" ){
			panic(api.Error("All inputs are required",400));
		}

		_,insertErr := db.Exec("INSERT INTO todos (title,description,userid) VALUES ($1, $2, $3)",todo.Title,todo.Description,user.Id);

		if insertErr !=nil{
			panic(insertErr)
		}

    
	    
		api.Json(res,api.Response[int64]{
			Message: "Todo created Successfully",
			StatusCode: 201,
			Success: true,
		})
	
	
	}
}
func UpdateTodo(db *sql.DB)http.HandlerFunc{
	return func (res http.ResponseWriter, req *http.Request){
		todoid := chi.URLParam(req,"todo_id");
          
		id,err := strconv.Atoi(todoid);

		if err !=nil{
		   panic(api.Error("todo id is invalid",400));
		}

		var todo model.Todo;

		json.NewDecoder(req.Body).Decode(&todo);
        

		if(todo.Description == "" && !todo.Completed && todo.Title == ""){
			panic(api.Error("Atleast 1 input is required",400));
		}
		fmt.Println(todo)

	    var args []interface{};

		var query string

		var updates []string;

		query = "UPDATE todos SET"
         
		count := 1;
		if (todo.Title != ""){
			updates = append(updates, fmt.Sprintf("title = $%d",count));
			args = append(args, todo.Title)
			count++;
		}
		if (todo.Description != ""){
			updates = append(updates, fmt.Sprintf("description = $%d",count));
			args = append(args, todo.Description)
			count++;
		}
		if (todo.Completed){
			updates = append(updates, fmt.Sprintf("completed = $%d",count));
			args = append(args, todo.Completed)
			count++
		}

		query += " " + strings.Join(updates, ", ");

		query += fmt.Sprintf(" WHERE todoid = $%d",count);

		args = append(args, id);

		fmt.Printf("the query is %v",query)
		fmt.Println(args)

		result,updateErr := db.Exec(query,args...);
         
		if updateErr !=nil{
			panic(updateErr)
		}

		updatedCount,err := result.RowsAffected();

		if (err != nil){
			panic(err)
		}

		if(updatedCount == 0){
			panic(api.Error("Todo not found",404))
		}

		api.Json(res,api.Response[interface{}]{
			 Message: "Todo update successfully",
			 StatusCode: 200,
			 Success: true,
		})


	}
}
func DeleteTodo(db *sql.DB)http.HandlerFunc{
	return func (res http.ResponseWriter, req *http.Request){
		todoid := chi.URLParam(req,"todo_id");
          
		id,err := strconv.Atoi(todoid);

		if err !=nil{
		   panic(api.Error("todo id is invalid",400));
		}

		fmt.Println(id)

		result,deleteErr := db.Exec("DELETE FROM todos WHERE todoid = $1",id);
          
		if deleteErr != nil{
			panic(deleteErr)
		}
     
		deleteCount,_:= result.RowsAffected();

		 if deleteCount == 0{
			panic(api.Error("todo not found",404));
		 }


		api.Json(res,api.Response[interface{}]{
             Message: "Todo deleted successdffully",
			 StatusCode: 200,
			 Success: true,
		})
	}
}







