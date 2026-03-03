

interface ShowShop {
  id: string;
}
interface StoreShop {
  name: string;
  description: string;
  address: string;
  ward: string;
  district: string;
  provionce: string;
  logo: string;
}
interface shop{
  name: string;
  description: string;
  logo: string;
}
interface ShowUpdateShop{
  show:boolean
  setShow:(value :boolean)=>void;
  shopID:shop|null;
  setShopID: (v:shop|null)=>void;
  id:string

}
interface ShowDeleteShop{
  id :string
  showDelete:boolean
  setShowDelete:(value :boolean)=>void;
}
interface shopUpdate{
  id:string
  name: string;
  description: string;
  logoUrl: string;
  address_id?:number;
}
interface shopUpdate2{
  id:string
  name: string;
  description: string;
  logoPreview?: string;
  address_id?:number;
}