"use client"
import logout from "@/services/auth/logout.service";
import { useRouter } from "next/navigation";

export default  function LogOut() {
     const router = useRouter();
    try{
       
    const handleLongOut = async ()=>{
          await logout();
        router.push("/login")
    }
      handleLongOut();
    }
    catch{

    }
};
