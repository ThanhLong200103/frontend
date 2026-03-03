import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function showProduct(props : IdProduct) {
    const{id} = props
    const { data } = useSWR(`/api/products/${id}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });
  return {
    data :data,
    imgCenter : data?.product?.images[0]?.url
  }
};
