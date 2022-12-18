export interface Merchant {
  id: string;
}
export interface Status {
  id: number;
  displayName: string;
}

export interface MerchantStatus {
  id: number;
  merchantNumber: string;
  status: Status;
}
