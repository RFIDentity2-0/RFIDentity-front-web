export interface Asset {
  AssetId: string;
  Description: string;
  VM_Location: string;
  Status: string;
  Action: string;
}

export interface RoomAssets {
  Room: string;
}

//temporary for testing

export interface RoomSelection {
  name: string;
  selected: boolean;
  subroom?: RoomSelection[];
}
