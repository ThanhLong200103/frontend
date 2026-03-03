import api from "@/lib/api";


export default async function storeShop(props :StoreShop) {
    const {name , description , address , ward , district , provionce , logo} = props
 
     const res = await api.post('api/shopCreate', {name , description , address , ward , district , provionce , logo});
   
    return {
        
        role: res.data.role
    }
};
