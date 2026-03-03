import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function showShop(props : ShowShop) {
    const {id} = props
    const { data, isLoading, error } = useSWR(`api/shop/${id}`, fetcher);
    const shops = data?.shop??[];
    return shops;
};
