import { fetcher } from "@/lib/fetcher";
import { authStore } from "@/stores/authStore";
import useSWR from "swr";
interface IdShop{
    id:string
}
export default  function indexAddress(props :IdShop) {
    const{id} = props
    const token = authStore((state) => state.token);
    const{data ,isLoading ,error ,mutate} = useSWR( token ?`/api/Shop/${id}/shopAddress`:null,fetcher)
    const address = data?.address??[]
    return address
};
