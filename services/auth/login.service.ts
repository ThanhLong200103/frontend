import api from "@/lib/api";
import { authStore } from "@/stores/authStore";

export default async function Login(props:LogIN) {
    const {name , password} = props
    const res = await api.post('/api/auth/login', {name, password });
         authStore.getState().setToken(res.data.access_token);
        
        return {
        role: res.data.role,
}
}
