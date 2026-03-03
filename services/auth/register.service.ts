import api from "@/lib/api"

export default async function RegisterHadle(props : register) {
    const {name , email , password , phone} = props
    const res = await api.post('api/auth/register',{name , email , password , phone})
    return res
};