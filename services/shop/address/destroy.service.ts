import api from "@/lib/api"
import { mutate } from "swr"

export default async function destroyAddressShop(props:showAddress2) {
    const {id ,addressId} = props
    const res = await api.delete(`/api/Shop/${id}/shopAddress/${addressId}`)
    return res
};
