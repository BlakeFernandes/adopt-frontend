"use client";

import { useEffect, useState } from "react";
import FallbackImage from "./FallbackImage";

type Puppy = {
  name: string;
  breed: string;
  age: number;
  photoUrl: string;
  traits: string[];
};

export default function Home() {
  const [data, setData] = useState<Puppy[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/puppies")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((puppy) => (
          <div
            key={puppy.name} // change to something better for vDom
            className="flex flex-col items-center text-center p-4 rounded-lg"
          >
            <div className="w-48 h-48 overflow-hidden rounded-full">
              <FallbackImage
                src={puppy.photoUrl}
                alt={puppy.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-semibold mt-5">{puppy.name}</h2>
            <p className="text-sm font-semibold uppercase mt-1">
              {puppy.breed}
            </p>
            <p className="text-gray-500 text-sm mt-3">{puppy.age} years old</p>
            <p className="text-gray-500 text-sm">{puppy.traits.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}