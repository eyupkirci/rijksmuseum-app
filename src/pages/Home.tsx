import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { RootState, setQuery, useFetchUltimateArtworksQuery } from "../redux";
import { ArtObject } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import ColorPalette from "../components/ColorPalette";
import FilterItem from "../components/Filter";

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

  const handleCardClick = (result: ArtObject) => {
    navigate(`/${result?.objectNumber}`);
    dispatch(setQuery({}));
  };

  const handleColorFilter = (e: any) => {
    console.log(e.target.id);
    dispatch(setQuery({ ...query, color: e.target.id, q: search }));
  };

  const handleCloseClick = (item: string) => {
    dispatch(setQuery({ ...query, [item]: "" }));
    if (item === "q") setSearch("");
  };

  useEffect(() => {
    dispatch(setQuery({ ...query }));
  }, []);

  return (
    <div className="grow w-full overflow-y-auto overflow-x-hidden p-1">
      {/* Welcome User */}
      <p className="py-3">
        Welcome <span className="text-gray-400"> {user?.email}</span>
      </p>

      {/* SearchBar */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Search Error */}

      {error && <p className="py-2 text-gray-500">Something went wrong</p>}

      {/* Filter */}
      <div id="filter-container" className="mt-4">
        <div className="flex flex-col gap-2">
          <h4>Filters</h4>
          {query && (
            <div className="flex  gap-6">
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
            </div>
          )}
          <h4>Color</h4>
          <ColorPalette handleColorFilter={handleColorFilter} data={ultimateResults} />
        </div>
      </div>
      {/* Search Results */}
      {ultimateResults?.artObjects?.length > 0 ? (
        <div
          id="card-container"
          className="text-center flex-col justify-center items-center gap-2 flex-wrap ">
          <h3 className="mt-4 text-xl text-center">{ultimateResults?.count ?? 0} image found</h3>
          <div className="grid justify-center text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
            {ultimateResults?.artObjects?.map((result: ArtObject) => (
              <Card key={result.id} data={result} onClick={() => handleCardClick(result)} />
            ))}
          </div>
        </div>
      ) : query.q !== "" ? (
        <h3 className="mt-4 text-xl text-center"> No image found</h3>
      ) : undefined}

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
