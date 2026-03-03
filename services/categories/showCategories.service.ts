import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function showCategorie(props:IdCategories) {
    const{id} = props
     const { data, isLoading, error } = useSWR(`/api/categories/${id}`, fetcher,
    {revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,}
  );
  return{
    data:data?.categories??[]
  }
};
