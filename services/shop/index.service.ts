import { fetcher } from "@/lib/fetcher";
import { authStore } from "@/stores/authStore";
import useSWR from "swr";

export default function ShopIndex() {
     const token = authStore((state) => state.token);
  const { data, error, isLoading } = useSWR(
    token ? "/api/shops" : null,
    fetcher,
  );
  //    console.log(data)
  const shop = data?.shop?? [];
   const shops =shop.filter((s:any) => {
    return s.status === 'Approved'
  });
  return shops;
};
