import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"

export default function showtrueAddressService(props:ShowShop) {
    const {id} = props
    const {data,isLoading,error} = useSWR(`/api/shop/${id}/shopAddressesTrue`,fetcher)
    const address = data?.address??[]
    return address;
};
