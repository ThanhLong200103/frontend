import api from "@/lib/api";

export default async function UpdateShopService(props: shopUpdate) {
  const { name, description, logoUrl, address_id, id } = props;
  const res = await api.put(`/api/shopUpdate/${id}`, {
    name,
    description,
    logo:logoUrl,
    address_id,
  });
  return res;
}
