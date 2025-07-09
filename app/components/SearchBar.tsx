"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Pokemon = {
  name: string;
  url: string;
};

type DetailedPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

interface Props {
  data: Pokemon[];
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const SearchBar: React.FC<Props> = ({ data }) => {
  const [filtered, setFiltered] = useState<Pokemon[]>(data);
  const [detailedData, setDetailedData] = useState<DetailedPokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const results = await Promise.all(
        filtered.map((poke) => fetch(poke.url).then((res) => res.json()))
      );
      setDetailedData(results);
    };

    fetchDetails();
  }, [filtered]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-700 p-4 md:p-8">
      {/* Pokédex Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full border-4 border-black flex items-center justify-center mr-4">
              <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-black"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Pokédex
            </h1>
          </div>
          <div className="text-white text-lg font-semibold">
            {detailedData.length} / {data.length}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search Pokémon by name..."
            className="w-full p-4 pr-12 rounded-xl border-2 border-black shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Pokémon Grid */}
        {detailedData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {detailedData.map((poke) => {
              const primaryType = poke.types[0]?.type.name || "normal";
              const bgColor = typeColors[primaryType] || "bg-gray-400";

              return (
                <div
                  key={poke.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 border-black transition-all duration-300 hover:scale-105 hover:shadow-xl ${bgColor} bg-opacity-20`}
                >
                  <div className="relative h-40 bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
                    <Image
                      src={
                        poke.sprites.other["official-artwork"]?.front_default ||
                        poke.sprites.front_default
                      }
                      alt={poke.name}
                      width={120}
                      height={120}
                      className="object-contain h-full w-full p-4"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                      #{poke.id.toString().padStart(3, "0")}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold capitalize text-center text-gray-800 mb-1">
                      {poke.name}
                    </h3>
                    <div className="flex justify-center gap-1 mb-2">
                      {poke.types.map((type, index) => (
                        <span
                          key={index}
                          className={`${
                            typeColors[type.type.name]
                          } text-white text-xs px-2 py-1 rounded-full capitalize`}
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mb-3">
                      <span>HT: {(poke.height / 10).toFixed(1)}m</span>
                      <span>WT: {(poke.weight / 10).toFixed(1)}kg</span>
                    </div>
                    <Link
                      href={`/pokemon/${poke.id}`}
                      className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-medium transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <Image
              src="/sad-pikachu.png" // Replace with your own image or remove
              alt="No Pokémon found"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Pokémon found!
            </h3>
            <p className="text-gray-600">
              Try a different search term or check your spelling.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
