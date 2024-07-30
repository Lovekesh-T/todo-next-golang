import axios from "axios";

export async function getUser(token:string){
   
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/me`,{
        headers:{
            Authorization:token
        }
      });
      return res.data;  
    } catch (error) {

      throw error
    }
  
  }