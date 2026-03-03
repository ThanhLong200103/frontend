import { fetcher } from "@/lib/fetcher"
import { authStore } from "@/stores/authStore"
import useSWR from "swr"

export default function showAddressShop(props:showAddress2) {
    const {id,addressId} = props
    const token = authStore((state)=>state.token)
    const {data} = useSWR(token?`/api/Shop/${id}/shopAddress/${addressId}`:null,fetcher)
    const addressShow = data?.address??[]
    return addressShow
};
