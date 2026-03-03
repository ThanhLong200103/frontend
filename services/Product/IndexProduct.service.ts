import api from "@/lib/api"

export default async function IndexProduct(props:paginateProduct) {
    const{page,limit}=props
    const res = await api.get('/api/products',{
       params: {
    page,
    limit
       }})
       return {
        product:res?.data[0].data,
        pagination:res?.data[0].pagination
       }
};
