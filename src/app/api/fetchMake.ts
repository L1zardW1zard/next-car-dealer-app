import axios from "axios";
import { MakeFetchResponse, SelectItemType } from "../utils/types";

export default async function fetchMake(): Promise<SelectItemType[]> {
  const { data }: MakeFetchResponse = await axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );

  if (data?.Results) {
    const carMake: SelectItemType[] = [];

    for (let i = 0; i < data?.Results.length; i++) {
      const element = data?.Results[i];
      carMake.push({
        value: element.MakeId,
        name: element.MakeName,
      });
    }

    return carMake;
  }

  return [];
}
