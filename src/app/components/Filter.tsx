import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { SelectItemType } from "../utils/types";

interface FilterProps {
  filters: Record<string, SelectItemType[]> | undefined;
  onFilterChange: (key: string, value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-6">
      <div className="mb-4 font-bold">Filter</div>
      {filters &&
        Object.entries(filters).map(([key, options]) => (
          <div key={key} className="mb-2 flex justify-between content-center items-center">
            <Label htmlFor={key}>{key}</Label>
            <Select
              name={key}
              onValueChange={(value) => {
                onFilterChange(key, value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => {
                  return (
                    <SelectItem value={option.value.toString()} key={option.value.toString()}>
                      {option.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        ))}
    </div>
  );
};

export default Filter;
