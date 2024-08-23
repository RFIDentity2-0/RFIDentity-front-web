export interface Asset {
  assetId: string;
  description: string;
  hardwareType: string | null;
  type: string | null;
  status: string | null;
  room: string | null;
}

export interface DetailAssets {
  totalPages: number;
  totalElements: number;
  content: Asset[];
}
