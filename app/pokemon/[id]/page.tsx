import Image from "next/image";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
  name: string;
  is_hidden: boolean;
}

interface Stats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Moves {
  move: {
    name: string;
  };
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

const PokemonDetailPage = async ({ params }: PageProps) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await res.json();

  // Get primary type for color theme
  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType] || "bg-gray-100";

  return (
    <div className={`min-h-screen py-8 ${bgColor} bg-opacity-20`}>
      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-2xl bg-white transform transition-all duration-300 hover:shadow-lg">
        {/* Header with Pokémon name and ID */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md transform -translate-y-12 border-4 border-yellow-400">
            <h1 className="text-4xl font-bold capitalize text-gray-800 tracking-wide">
              {pokemon.name}
            </h1>
            <p className="text-gray-600 font-mono">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Image */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full p-4 shadow-inner border-4 border-yellow-300 animate-pulse-slow">
              <Image
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                priority
                fill
                style={{ objectFit: "contain" }}
                alt={pokemon.name}
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Height and Weight */}
            <div className="mt-6 grid grid-cols-2 gap-4 w-full">
              <div className="bg-white p-4 rounded-lg shadow text-center border-t-4 border-blue-300">
                <p className="text-sm text-gray-500">Height</p>
                <p className="text-xl font-bold">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center border-t-4 border-green-300">
                <p className="text-sm text-gray-500">Weight</p>
                <p className="text-xl font-bold">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Details */}
          <div className="space-y-6">
            {/* Types */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Types
              </h2>
              <div className="flex flex-wrap gap-3">
                {pokemon.types.map((t: PokemonType) => (
                  <span
                    key={t.slot}
                    className={`${
                      typeColors[t.type.name] || "bg-gray-400"
                    } text-white px-4 py-2 rounded-full text-sm font-bold shadow-md capitalize`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-400">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Abilities
              </h2>
              <ul className="grid grid-cols-2 gap-3">
                {pokemon.abilities.map((a: Ability) => (
                  <li
                    key={a.ability.name}
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-center capitalize transition-colors duration-200"
                  >
                    {a.ability.name}
                    {a.is_hidden && (
                      <span className="text-xs block text-gray-500">
                        (hidden)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats and Moves */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Stats */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-400">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Base Stats
            </h2>
            <ul className="space-y-3">
              {pokemon.stats.map((s: Stats) => (
                <li key={s.stat.name} className="flex items-center">
                  <span className="w-32 capitalize text-gray-700 font-medium">
                    {s.stat.name.replace("-", " ")}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        s.base_stat > 70
                          ? "bg-green-500"
                          : s.base_stat > 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(100, s.base_stat)}%` }}
                    ></div>
                  </div>
                  <span className="w-10 text-right font-bold">
                    {s.base_stat}
                  </span>
                </li>
              ))}
              <li className="flex items-center pt-2 border-t border-gray-200 mt-2">
                <span className="w-32 font-bold text-gray-800">Total</span>
                <span className="flex-1"></span>
                <span className="w-10 text-right font-bold text-xl">
                  {pokemon.stats.reduce(
                    (sum: number, s: Stats) => sum + s.base_stat,
                    0
                  )}
                </span>
              </li>
            </ul>
          </div>

          {/* Moves */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-400">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Moves
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 10).map((m: Moves) => (
                <span
                  key={m.move.name}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm capitalize transition-colors duration-200"
                >
                  {m.move.name.replace("-", " ")}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Showing 10 of {pokemon.moves.length} moves
            </p>
          </div>
        </div>

        {/* Additional Sprites */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border-l-4 border-green-400">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Sprites</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pokemon.sprites.front_default && (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-2">Default</p>
                <Image
                  src={pokemon.sprites.front_default}
                  width={96}
                  height={96}
                  alt={`${pokemon.name} default`}
                  className="mx-auto"
                />
              </div>
            )}
            {pokemon.sprites.front_shiny && (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-2">Shiny</p>
                <Image
                  src={pokemon.sprites.front_shiny}
                  width={96}
                  height={96}
                  alt={`${pokemon.name} shiny`}
                  className="mx-auto"
                />
              </div>
            )}
            {pokemon.sprites.back_default && (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-2">Back Default</p>
                <Image
                  src={pokemon.sprites.back_default}
                  width={96}
                  height={96}
                  alt={`${pokemon.name} back default`}
                  className="mx-auto"
                />
              </div>
            )}
            {pokemon.sprites.back_shiny && (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-2">Back Shiny</p>
                <Image
                  src={pokemon.sprites.back_shiny}
                  width={96}
                  height={96}
                  alt={`${pokemon.name} back shiny`}
                  className="mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
