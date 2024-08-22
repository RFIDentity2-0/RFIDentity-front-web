///////////////////////////
//temporary for testing

export interface RoomSelection {
  name: string;
  selected: boolean;
  subroom?: RoomSelection[];
}
export interface RoomAssets {
  Room: string;
}
///////////////////////////
export interface Room {
  [key: string]: Asset[];
}

export interface DataResponse {
  totalPages: number;
  content: Room[];
  totalElements: number;
}
export interface Asset {
  assetId: string;
  description: string;
  status: string | null;
}
