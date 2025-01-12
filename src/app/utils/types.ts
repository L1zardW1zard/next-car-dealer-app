export interface ProductDisplayType {
  Make_ID: number;
  Make_Name: string;
  Model_ID: string;
  Model_Name: string;
}

export interface FetchResponse {
  data: {
    Results?: any[];
  };
}

export interface MakeFetchResponse {
  data: {
    Results?: MakeFetchResponseItem[];
  };
}

export interface MakeFetchResponseItem {
  MakeId: number;
  MakeName: string;
  VehicleTypeId?: number;
  VehicleTypeName?: string;
}

export interface SelectItemType {
  value: number;
  name: string;
}
