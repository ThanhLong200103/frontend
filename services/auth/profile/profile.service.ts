import { fetcher } from "@/lib/fetcher";
import { authStore } from "@/stores/authStore";
import useSWR from "swr";

export default function IndexProfile() {
    const token = authStore((state) => state.token);
    const { data, error, isLoading } = useSWR(
    token ? "/api/auth/me" : null,
    fetcher,
  );
  return { data, error, isLoading };
};

