import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function indexCategories() {
    const { data, isLoading, error } = useSWR("/api/categories", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });
  return {
    data:data?.categories??[]
  }
};
