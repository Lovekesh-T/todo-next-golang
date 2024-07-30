"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

type Todo = {
  title: string;
  description: string;
  todoid: number;
  completed: boolean;
  userid: number;
};

const ListItem = ({
  todo,
  deleteTodo,
}: {
  todo: Todo;
  deleteTodo: (id: number) => void;
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const target = useRef<HTMLInputElement>(null);

  const updateTodo = async () => {
    const token = localStorage.getItem("token");
    console.log(todo.todoid);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/todos/${todo.todoid}`,
        {
          title,
          description,
          completed,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(res.data.message);
      setEdit(false);
      setDisable(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setDisable(false);
  }, [title, description]);
  return (
    <li
      className="pb-3 mb-2 cursor-pointer bg-blue-950 rounded hover:bg-blue-900 transition py-3 px-4 sm:pb-4"
      key={todo.todoid}
    >
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className=" flex flex-col gap-1 items-start flex-1 min-w-0">
          <input
            ref={target}
            value={title.toUpperCase()}
            disabled={!edit}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none bg-transparent text-lg font-bold"
          />

          <textarea
            disabled={!edit}
            rows={2}
            cols={25}
            className="resize-none outline-none bg-transparent text-sm"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="flex items-center ">
          <input
            defaultChecked={completed}
            onChange={(e)=>setCompleted(e.target.checked)}
            id="green-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="green-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Completed
          </label>
        </div>
        <button
          onClick={() => deleteTodo(todo.todoid)}
          className="bg-red-500 hover:bg-red-600 transition py-1 px-3 rounded"
        >
          <HiOutlineTrash />
        </button>
        <button
          onClick={() => {
            setEdit(true);
            target.current?.focus();
          }}
          className="bg-blue-500 hover:bg-blue-600 transition py-1 px-3 rounded"
        >
          <HiOutlinePencil />
        </button>

        <button
          disabled={disable}
          className="bg-green-600 hover:bg-green-700 py-1 px-3 rounded text-xs"
          onClick={updateTodo}
        >
          Update
        </button>
      </div>
    </li>
  );
};

export default ListItem;
