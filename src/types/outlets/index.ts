export interface Outlet {
  name: string;
  outletCode: string;
  address: string;
  state: string;
  region: string;
  city: string;
  channel: string;
  subChannel: string;
  managerName: string;
  managerPhoneNumber: string;
  supplierName: string;
  userCode: string;
  lastvisit: string;
}

export interface Entries {
  outletName: string;
  address: string;
  state: string;
  region: string;
  city: string;
  channel: string;
  subChannel: string;
  managerName: string;
  managerPhone: string;
  suppliers: string;
}
