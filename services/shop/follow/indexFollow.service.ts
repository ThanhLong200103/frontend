import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"

export default function indexFollowShop(props:ShowShop) {
    const {id} =props
    const{data ,isLoading,error} = useSWR(`/api/shop/${id}/shopFollowers`,fetcher)
    const $total = data?.total
    return {
        $total
    }
};
