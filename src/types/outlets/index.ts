export interface Outlet {
  name: string;
  outletCode: string;
  address: string;
  state: string;
  region: string;
  city: string;
  channel: string;
  subchannel: string;
  managerName: string;
  managerPhoneNumber: string;
  supplierName: string;
  userCode: string;
  lastvisit: string;
}

export interface Entries {
  name: string;
  address: string;
  state: string;
  region: string;
  outletCode: string;
  city: string;
  channel: string;
  subChannel: string;
  managerName: string;
  managerPhone: string;
  suppliers: string;
  userCode: string;
}

export interface Schedule {
  outletName: string;
  outletCode: string;
  outletaddress: string;
  date: string;
  day: string;
  userCode: string;
}
