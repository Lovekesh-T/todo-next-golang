package api

import (
	"encoding/json"
	"net/http"
)



func CatchError(handler http.HandlerFunc) http.HandlerFunc{

	return func(res http.ResponseWriter,req *http.Request){
		defer func(){
         
			if err:= recover();err !=nil{
				res.Header().Set("Content-type","application/json");
                
				if apiError,ok := err.(ApiError);ok{
					res.WriteHeader(apiError.StatusCode);
					json.NewEncoder(res).Encode(apiError);

				} else {
                    
					res.WriteHeader(500)
					json.NewEncoder(res).Encode(ApiError{
						Message: "Internal Server Error",
						StatusCode: 500,
						Success: false,
					})
				}
			}
		}()

		handler(res,req)
	}

}