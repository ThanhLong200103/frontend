import api from "@/lib/api";

export default async function UpdateShopService2(props:shopUpdate2) {
    const { name, description,logoPreview , address_id, id } = props;
  const res = await api.put(`/api/shopUpdate/${id}`, {
    name,
    description,
    logo:logoPreview,
    address_id,
  });
  return res;
};
