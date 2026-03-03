interface showStoreAddress {
  id: string;
  storeAddress: boolean;
  setStoreShowAddress: (v: boolean) => void;
}
interface StoreAddress {
  id: string;
  address: string;
  ward: string;
  district: string;
  provionce: string;
}
interface AllShowAddress {
  id: string;
  showAddressAll: boolean;
  setShowAddressAll: (v: boolean) => void;
}
interface showAddress {
  id: string;
  addressId: string;
  showAddress: boolean;
  setShowAddress: (v: boolean) => void;
}
interface showAddress2 {
  id: string;
  addressId: string;
}
interface UpdateAddressShop {
  id: string;
  addressId: string;
  address: string;
  ward: string;
  district: string;
  provionce: string;
}
