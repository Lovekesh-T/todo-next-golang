"use server";

import axios from "axios";



export async function logout(){

    try {        
        const res = await axios.get("/api/logout");
        return res.data;
    } catch (error) {
        throw error
    }
    
}