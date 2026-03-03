import api from "@/lib/api";

export default async function followShopservice(props :ShowShop) {
    const {id} = props
    const status = await api.post(`/api/shop/${id}/follow`)
    return status.data?.follow as boolean
};
