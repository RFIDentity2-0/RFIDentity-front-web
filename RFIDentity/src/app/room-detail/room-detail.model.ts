export interface Asset {
  assetId: string;
  description: string;
  itemStatus: string | null;
  comment: string | null;
}

export interface DetailAssets {
  totalPages: number;
  totalElements: number;
  content: Asset[];
}
