import SearchBar from "./components/SearchBar";

export default async function Home() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/", {
    cache: "no-store",
  });
  const data = await res.json();
  const pokemonList = data.results; // This is the array you want

  return (
    <div>
      <SearchBar data={pokemonList} />
    </div>
  );
}
