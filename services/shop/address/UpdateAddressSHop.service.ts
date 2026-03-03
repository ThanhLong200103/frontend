import api from "@/lib/api"

export default async function UpdateAddressShop(props:UpdateAddressShop) {
    const {id,addressId,address,ward,provionce,district} = props
    const res = await api.put(`/api/Shop/${id}/shopAddress/${addressId}`,{address,ward,provionce,district})
    return res
};