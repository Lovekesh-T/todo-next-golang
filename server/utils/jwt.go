package api

import (
	"errors"
	"fmt"
	model "golangserver/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(user model.User)string{

	var key = []byte(os.Getenv("JWT_SECRET"));
       

	fmt.Printf("%#v",user);
    // Create the claims
    claims := jwt.MapClaims{
        "id": user.Id,
        "name": user.Name,
        "exp": time.Now().Add(time.Hour * 72).Unix(), // Token expiration time
        "email": user.Email,
    }

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,claims)

	tokenString,err :=token.SignedString(key);
	if err !=nil{
		panic(err);
	}
    return tokenString
}


func VerifyJWT(tokenString string)(model.User,error){
    
	// Your secret key
    secretKey := []byte(os.Getenv("JWT_SECRET"));

    // Claims structure to parse the token into
    claims := jwt.MapClaims{}

    // Parse the token with claims and verify the signature using the secret key
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return secretKey, nil
    });
     
	var user model.User

	if err != nil{
		return user,err;
	}

	if token.Valid{
		if email,ok :=claims["email"].(string);ok{
             user.Email = email
		}

		if name,ok := claims["name"].(string);ok{
			user.Name = name;
		}

		if id,ok := claims["id"].(float64);ok{
			user.Id = int(id);
		}

		return user,nil;
		
	}else{
		return user,errors.New("token not valid");
	}

}