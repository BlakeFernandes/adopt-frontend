import { PuppyWithId } from "@/app/page";
import React from "react";
import FallbackImage from "./FallbackImage";

export const PuppyCard = React.memo(({ puppy }: { puppy: PuppyWithId }) => {
  return (
    <a
      className="flex flex-col items-center text-center p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
      href={`/puppies/${puppy._id}`}
    >
      <div className="w-48 h-48 overflow-hidden rounded-full">
        <FallbackImage
          src={puppy.photoUrl}
          alt={puppy.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold mt-5">{puppy.name}</h2>
      <p className="text-sm font-semibold uppercase mt-1">{puppy.breed}</p>
      <p className="text-gray-500 text-sm mt-3">{puppy.age} years old</p>
      <p className="text-gray-500 text-sm">{puppy.traits.join(", ")}</p>
    </a>
  );
});

PuppyCard.displayName = "PuppyCard";
