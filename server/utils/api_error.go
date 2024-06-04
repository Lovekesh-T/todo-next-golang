package api


type ApiError struct{
	Message string 	`json:"message"`
	StatusCode int  `json:"statusCode"`
	Success    bool `json:"success"`
}


func Error(message string,status int)ApiError{
   return ApiError{
	  Message: message,
	  StatusCode: status,
	  Success: false,
   }
}