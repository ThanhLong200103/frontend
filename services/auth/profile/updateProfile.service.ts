import api from "@/lib/api";

export default async function  updateProfile(props:updateProfile) {
    const {email,phone} = props
    const res =  await api.put("/api/auth/profile", {email , phone});
    return res
};
