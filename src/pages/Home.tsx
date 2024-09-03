import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { RootState, setQuery, useFetchUltimateArtworksQuery } from "../redux";
import { ArtObject } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import ColorPalette from "../components/ColorPalette";
import FilterItem from "../components/Filter";
import Makers from "../components/Makers";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useSelector((state: RootState) => state.app);
  const { user } = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState<string>(query.q as string);

  const queryRef = useRef(query);

  const {
    data: ultimateResults,
    error,
    isLoading,
  } = useFetchUltimateArtworksQuery(query, {
    skip: query === queryRef.current,
  });
  console.log("🚀 ~ Home ~ ultimateResults:", ultimateResults);

  const handleCardClick = (result: ArtObject) => {
    navigate(`/${result?.objectNumber}`);
    dispatch(setQuery({}));
  };

  const handleColorFilter = (e: any) => {
    console.log(e.target.id);
    dispatch(setQuery({ ...query, color: e.target.id }));
  };

  const handleMakerFilter = (e) => {
    console.log("Makers", e.target.id);
    dispatch(setQuery({ ...query, maker: e.target.id }));
  };

  const handleCloseClick = (item: string) => {
    dispatch(setQuery({ ...query, [item]: "" }));
    if (item === "q") setSearch("");
  };

  useEffect(() => {
    dispatch(setQuery({ ...query }));
  }, []);

  return (
    <div className="grow w-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row">
      {/* Main Section */}
      <main className="overflow-y-auto overflow-x-hidden flex-1 p-6 bg-gray-100">
        {/* SearchBar */}
        <SearchBar search={search} setSearch={setSearch} />
        {error && <p className="py-2 text-gray-500">Something went wrong</p>}

        {/* Search Results */}
        {ultimateResults?.artObjects?.length > 0 ? (
          <div
            id="card-container"
            className="text-center flex-col justify-center items-center gap-2 flex-wrap ">
            <h3 className="mt-4 text-xl text-center">{ultimateResults?.count ?? 0} image found</h3>
            <div className="flex justify-center text-center flex-wrap  w-full gap-2">
              {ultimateResults?.artObjects?.map((result: ArtObject) => (
                <Card key={result.id} data={result} onClick={() => handleCardClick(result)} />
              ))}
            </div>
          </div>
        ) : query.q !== "" ? (
          <h3 className="mt-4 text-xl text-center"> No image found</h3>
        ) : undefined}
      </main>

      {/* Filter Section */}
      <aside className="hidden md:block md:w-1/5 bg-gray-200 p-6 overflow-y-auto overflow-x-hidden">
        {/* Welcome User */}
        <p className="py-3">
          Welcome <span className="text-gray-400"> {user?.email}</span>
        </p>
        {/* Filter */}
        <div id="filter-container" className="mt-4">
          <div className="block">
            <h4 className="mt-4 font-[700]">Filters</h4>
            {query && (
              <div className="flex flex-row gap-5">
                {query.q && (
                  <FilterItem data={query} filter={"q"} onClick={() => handleCloseClick("q")} />
                )}
                {query.color && (
                  <FilterItem
                    data={query}
                    filter={"color"}
                    onClick={() => handleCloseClick("color")}
                  />
                )}
                {query.maker && (
                  <FilterItem
                    data={query}
                    filter={"maker"}
                    onClick={() => handleCloseClick("maker")}
                  />
                )}
              </div>
            )}
            <h4 className="mt-4 font-[700]">Colors</h4>
            <ColorPalette handleColorFilter={handleColorFilter} data={ultimateResults} />
            <h4 className="mt-4 font-[700]">PrincipalMakers</h4>
            <Makers handleMakerFilter={handleMakerFilter} data={ultimateResults} />
          </div>
        </div>
      </aside>

      {/*Loading */}
      {isLoading && (
        <p className="absolute w-full h-full flex items-center justify-center mt-2 text-center text-gray-500">
          Loading...
        </p>
      )}
    </div>
  );
}

export default Home;
