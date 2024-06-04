package model

type Todo struct{
  TodoId  int `json:"todoid"`
  Title  string `json:"title"`
  Description string `json:"description"`
  Completed   bool    `json:"completed"`
  UserId      int     `json:"userid"`

}