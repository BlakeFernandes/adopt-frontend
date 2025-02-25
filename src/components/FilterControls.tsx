"use client";

import { toTitleCase } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type FilterControlsProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    breed: string;
    age: string;
    size: string;
    gender: string;
  };
  setFilters: (filters: {
    breed: string;
    age: string;
    size: string;
    gender: string;
  }) => void;
};

export type FilterOptions = {
  breeds: string[];
  ages: string[];
};

export default function FilterControls({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
}: FilterControlsProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    breeds: [],
    ages: [],
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/puppies/filters`)
      .then((response) => response.json())
      .then((data) => setFilterOptions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const ageOptions = [
    { value: "1", label: "1 Year" },
    { value: "2", label: "2 Years" },
    { value: "3", label: "3 Years" },
    { value: "4", label: "4 Years" },
    { value: "5", label: "5 Years" },
    { value: "6", label: "6 Years" },
    { value: "7", label: "7 Years" },
    { value: "8", label: "8 Years" },
    { value: "9", label: "9 Years" },
    { value: "10", label: "10 Years" },
  ];

  const sizeOptions = [
    { value: "Small", label: "Small" },
    { value: "Medium", label: "Medium" },
    { value: "Large", label: "Large" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by name or breed..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/3"
      />

      <select
        value={filters.breed}
        onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Breeds</option>
        {filterOptions.breeds &&
          filterOptions.breeds.map((breed) => (
            <option key={breed} value={breed}>
              {toTitleCase(breed)}
            </option>
          ))}
      </select>

      <select
        value={filters.age}
        onChange={(e) => setFilters({ ...filters, age: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Ages</option>
        {ageOptions.map((age) => (
          <option key={age.value} value={age.value}>
            {age.label}
          </option>
        ))}
      </select>

      <select
        value={filters.size}
        onChange={(e) => setFilters({ ...filters, size: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Sizes</option>
        {sizeOptions.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>

      <select
        value={filters.gender}
        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Genders</option>
        {genderOptions.map((gender) => (
          <option key={gender.value} value={gender.value}>
            {gender.label}
          </option>
        ))}
      </select>

      <Button
        onClick={() => {
          setFilters({ breed: "", age: "", size: "", gender: "" });
          setSearchQuery("");
        }}
        size={"lg"}
        className="my-auto"
      >
        Reset
      </Button>
    </div>
  );
}
