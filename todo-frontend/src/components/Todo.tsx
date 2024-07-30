"use client";

import { useState } from "react";
import ListItem from "./ListItem";
import axios from "axios";
import toast from "react-hot-toast";
import NewTodo from "./NewTodo";

type Todo = {
  title: string;
  description: string;
  todoid: number;
  completed: boolean;
  userid: number;
};

type User = {
  id: number;
  name: string;
  email: string;
};
const Todo = ({ data, user }: { data: Todo[]; user: User }) => {
  const [todos, setTodos] = useState<Todo[]>(data);

  const deleteTodo = async (id: number) => {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/todos/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    toast.success(data.message);

    setTodos((todos) => todos.filter((todo) => todo.todoid !== id));
  };

  const fetchTodos = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `http://localhost:4000/api/v1/todos/all?user_id=${user.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NewTodo fetchTodos={fetchTodos} />
      <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
        {todos.map((todo) => (
          <ListItem todo={todo} key={todo.todoid} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </>
  );
};

export default Todo;
