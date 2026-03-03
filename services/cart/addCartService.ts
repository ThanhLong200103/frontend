import api from "@/lib/api";

export default async function addCartService() {
    const res = await api.post('/api/cartAdd');
    return res?.data?.cart;
}
