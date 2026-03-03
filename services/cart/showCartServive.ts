import { fetcher } from "@/lib/fetcher";
import { authStore } from "@/stores/authStore";
import useSWR from "swr";

export default function showCartServive() {
    const token = authStore((state)=>state.token);
    const {data} = useSWR(token?"/api/cart":null , fetcher)
    return data
};
