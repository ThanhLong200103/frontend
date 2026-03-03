import { fetcher } from "@/lib/fetcher"
import { authStore } from "@/stores/authStore"
import useSWR from "swr"

export default function showCartItemService() {
    const token = authStore((state)=>state.token)
    const {data} = useSWR(token?'/api/cartItemsAll':null , fetcher)
    const dataItem = data?.cartItems??[]
    return  dataItem
};
