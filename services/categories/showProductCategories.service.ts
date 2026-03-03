import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function showProductCategorie(props:IdProductCategories) {
    const{selectedId} = props
     const { data, isLoading, error } = useSWR(`/api/categoriesProducts/${selectedId}`, fetcher,
    {revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,}
  );
  return{
    data2:data?.showProduct?.data??[]
  }
};
