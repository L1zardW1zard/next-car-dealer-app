import fetchMake from "@/app/api/fetchMake";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { FetchResponse, ProductDisplayType, SelectItemType } from "@/app/utils/types";
import { generateYearRange } from "@/app/utils/yearRange";
import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";

export async function generateStaticParams() {
  const makeIds = await fetchMake();
  const years = generateYearRange();

  const paths: any[] = [];

  makeIds.forEach((makeId: SelectItemType) => {
    years.forEach((year: SelectItemType) => {
      paths.push({ makeId: makeId.value.toString(), year: year.value.toString() });
    });
  });

  return paths.map(({ makeId, year }) => ({
    makeId,
    year,
  }));
}

async function fetchCurrentPageData({ makeId, year }: { makeId: string; year: string }): Promise<ProductDisplayType[]> {
  try {
    const { data }: FetchResponse = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    return data?.Results ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function ResultPage({ params }: { params: { makeId: string; year: string } }) {
  const { makeId, year } = params;

  const items = (await fetchCurrentPageData({ makeId, year })) || [];

  return (
    <div className="min-h-[100dvh] bg-slate-900 p-6">
      <div className="header flex gap-4 items-end mb-6">
        <h1 className="text-white font-bold text-3xl">Result Page</h1>
        <Link className="text-white font-bold text-sm" href="/">
          Back
        </Link>
      </div>
      <ul className="flex gap-6 flex-wrap">
        {items.map((item) => (
          <li key={item.Model_Name + "_" + item.Model_ID}>
            <Card className="min-w-[200px] bg-stone-900 text-white">
              <CardHeader>
                <CardTitle>{item.Make_Name}</CardTitle>
                <CardDescription className="text-white">{item.Model_Name}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
        {items.length === 0 && <div className="text-white font-bold text-xl">No items found...</div>}
      </ul>
    </div>
  );
}

export default function ResultPageWrapper({ params }: any) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-slate-900 p-6">
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <ResultPage params={params} />
    </Suspense>
  );
}
