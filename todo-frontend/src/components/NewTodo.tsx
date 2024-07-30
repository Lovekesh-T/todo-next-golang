"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePlusSm } from "react-icons/hi";

const NewTodo = ({ fetchTodos }: { fetchTodos: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTodo = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/todos/create`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchTodos();

      setVisible(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="mb-6">
      <button
        onClick={() => setVisible(true)}
        className="flex items-center bg-slate-500 self-start hover:bg-slate-600 font-semibold transition mb-5 px-4 py-1 rounded"
      >
        Add Todo <HiOutlinePlusSm className="text-xl" />
      </button>

      <form
        className={`${
          !visible ? "hidden" : ""
        } pb-3 cursor-pointer bg-blue-950 rounded hover:bg-blue-900 transition py-3 px-4 sm:pb-4`}
      >
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className=" flex flex-col gap-1 items-start flex-1 min-w-0">
            <input
              value={title.toUpperCase()}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none bg-transparent text-lg font-bold"
              placeholder="Title"
            />

            <textarea
              rows={2}
              cols={25}
              className="resize-none outline-none bg-transparent text-sm"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              value={description}
            />
          </div>
          <button
            className="bg-green-600 py-1 px-3 rounded text-xs"
            onClick={createTodo}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
