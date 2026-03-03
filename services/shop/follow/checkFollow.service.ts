import { fetcher } from "@/lib/fetcher";
import { authStore } from "@/stores/authStore";
import useSWR from "swr";

export default function checkFollow(props : ShowShop) {
    const {id} = props
    const token = authStore((state) => state.token);
    const{data , isLoading , error } = useSWR(token ?`/api/shop/${id}/checkFollow`:null,fetcher)
    const userFollow = data?.status??''
    return {

       userFollow, isLoading , error
    }
};
