export interface Asset {
  assetId: string;
  description: string;
  vmLocation: string | null;
  sapRoom: string;
  status: string | null;
}

export interface ApiResponse {
  totalPages: number;
  content: Asset[];
  totalElements: number;
}
export interface Inventory {
  inventory: number;
  date: Date;
}
