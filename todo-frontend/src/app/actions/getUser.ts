import axios from "axios";

export async function getUser(token:string){
   
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users/me",{
        headers:{
            Authorization:token
        }
      });
      return res.data;  
    } catch (error) {

      throw error
    }
  
  }