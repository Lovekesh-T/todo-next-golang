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
  confirmPassword: string;
  name: string;
};

export default function SignUp() {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<Formdata>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleForm = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formdata.name || !formdata.email || !formdata.password) return;
    if (formdata.password !== formdata.confirmPassword) {
        toast.error("Password and confirm-password doesn't match")
        return;
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/signup`,
        {
          name: formdata.name,
          email: formdata.email,
          password: formdata.password,
        }
      );

      toast.success(res.data.message);
      router.push("/signin");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md: lg:py-0">
    
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
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
                  type="name"
                  placeholder="Alex"
                  label="Your name"
                  value={formdata.name}
                  onClick={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormdata((data) => ({ ...data, name: e.target.value }));
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
                <Input
                  type="confirm-password"
                  placeholder="••••••••"
                  label="Confirm password"
                  onClick={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormdata((data) => ({
                      ...data,
                      confirmPassword: e.target.value,
                    }));
                  }}
                  value={formdata.confirmPassword}
                />

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setChecked(e.target.checked)
                      }
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleForm}
                  disabled={!checked}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link 
                  href={"/signin"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
