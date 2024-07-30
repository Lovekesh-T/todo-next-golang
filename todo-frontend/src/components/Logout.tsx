"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Logout = ()=> {
    const router = useRouter();
    const logoutHandler = async ()=>{

        try {
            const res = await axios.get("/api/logout");
            toast.success(res.data.message);
            router.push("/signin");
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <a
        onClick={logoutHandler}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        Sign out
      </a>
    )
}

export default Logout
