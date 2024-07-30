"use client";

import { Input } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Formdata = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [formdata, setFormdata] = useState<Formdata>({
    email: "",
    password: "",
  });

  const handleForm = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/signin`,
        {
          email: formdata.email,
          password: formdata.password,
        },{
            withCredentials:true
        }
      );
        
      console.log(res.data.data)
      localStorage.setItem("token",res.data.data);
      toast.success(res.data.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6">
                <Input
                  type="email"
                  placeholder="user@domain.com"
                  label="Your email"
                  value={formdata.email}
                  onClick={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormdata((data) => ({ ...data, email: e.target.value }));
                  }}
                />

                <Input
                  type="password"
                  placeholder="••••••••"
                  label="Password"
                  onClick={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormdata((data) => ({
                      ...data,
                      password: e.target.value,
                    }));
                  }}
                  value={formdata.password}
                />

                <button
                  onClick={handleForm}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {"Don't have an account?"}
                  <Link 
                  href={"/signup"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
