import api from "@/lib/api";
import { authStore } from "@/stores/authStore";

export default async function destroyShop(props:ShowShop) {
    const {id} = props
     await api.delete (`/api/shopDelete/${id}`);
    
};
