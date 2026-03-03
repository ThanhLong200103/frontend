import api from "@/lib/api"

export default async function storeShopAddress(props:StoreAddress) {
    const{id ,address,ward,district,provionce} = props
    const res = await api.post(`/api/Shop/${id}/shopAddress`,{address,ward,district,provionce})
    return res
};
