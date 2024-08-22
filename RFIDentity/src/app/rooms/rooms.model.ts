///////////////////////////
//temporary for testing

export interface RoomSelection {
  name: string;
  selected: boolean;
  subroom?: RoomSelection[];
}
// export interface RoomAssets {
//   Room: string;
// }
///////////////////////////
export interface RoomContent {
  Room: string;
  Items: Asset[];
}

export interface DataStructure {
  totalPages: number;
  content: RoomContent[];
  totalElements: number;
}
export interface Asset {
  assetId: string;
  description: string;
  status: string ;
}
