"use client";

import React from "react";
import Filter from "./components/Filter";
import { Button } from "./components/ui/button";
import { generateYearRange } from "./utils/yearRange";
import Link from "next/link";
import { SelectItemType } from "./utils/types";
import fetchMake from "./api/fetchMake";

export default function FilterPage() {
  const [filters, setFilters] = React.useState<Record<string, SelectItemType[]>>({
    Make: [],
    Year: [],
  });
  const [appliedFilters, setAppliedFilters] = React.useState<Record<string, string>>();
  const [allFiltersSelected, setAllFiltersSelected] = React.useState<boolean>(false);

  const handleFilterChange = (key: string, value: string) => {
    setAppliedFilters({
      ...appliedFilters,
      [key]: value,
    });
  };

  React.useEffect(() => {
    const setMakeFilter = async () => {
      const makeArray = await fetchMake();

      setFilters((prev) => {
        return { ...prev, Make: makeArray };
      });
    };

    const setYears = async () => {
      const years = generateYearRange();

      setFilters((prev) => {
        return { ...prev, Year: years };
      });
    };

    setMakeFilter();
    setYears();
  }, []);

  React.useEffect(() => {
    if (appliedFilters && filters && Object.values(appliedFilters).length === Object.values(filters).length) {
      setAllFiltersSelected(Object.values(appliedFilters).every((value) => value !== ""));
    }
  }, [appliedFilters, filters]);

  const getResultLink = (): string => {
    if (appliedFilters)
      return (
        "/result" +
        Object.entries(appliedFilters)
          .map(([key, option]) => {
            if (key && option) return `/${option.toLowerCase()}`;
          })
          .join("")
      );
    else return "/";
  };

  return (
    <div className="flex min-h-[100dvh] bg-slate-900">
      <main className="flex gap-6 p-4 m-auto h-fit flex-col items-center">
        <div className="relative p-8 h-fit rounded-xl border bg-card text-card-foreground shadow w-[320px] transition-all">
          {/* 
              Had no time to implement dynamic loading for async select blocks.
          */}
          <Filter filters={filters} onFilterChange={handleFilterChange} />

          {/* 
              Link may not resive correct format result/[makeId]/[year].
              I assumed that result will be fetched on same page 
              so structured selected filters data to be easy parsable to query string.
          */}
          <Link
            href={getResultLink() || "/"}
            className={
              "w-full  flex justify-center" + (getResultLink() && allFiltersSelected ? "" : " pointer-events-none")
            }
          >
            <Button disabled={!allFiltersSelected} className="w-full bg-slate-900">
              Next
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
