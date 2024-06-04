package api

import (
	"encoding/json"
	"net/http"
)



type Response[T any] struct {
	Message string `json:"message"`
	Success bool `json:"success"`
	StatusCode int  `json:"statusCode"`
	Data    T        `json:"data,omitempty"`   
}




func Json[T any](w http.ResponseWriter,apiResponse Response[T]){
	w.Header().Set("Content-Type","application/json");
    w.WriteHeader(apiResponse.StatusCode);
	json.NewEncoder(w).Encode(apiResponse);
}



