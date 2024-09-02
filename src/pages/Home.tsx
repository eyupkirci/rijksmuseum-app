import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {
  RootState,
  setQuery,
  setSearchTerm,
  useFetchArtworksByHexQuery,
  useFetchArtworksQuery,
} from "../redux";
import { ArtObject } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Card from "../components/Card";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchTerm, query } = useSelector((state: RootState) => state.app);
  const { user } = useSelector((state: RootState) => state.auth);

  const queryRef = useRef(query);
  const searchTermRef = useRef(searchTerm);

  const {
    data: searchResults,
    error: searchError,
    isLoading: isSearchLoading,
  } = useFetchArtworksQuery(searchTerm, {
    skip: searchTerm === searchTermRef.current,
  });

  const {
    data: imageResults,
    error: imageError,
    isLoading: isImageResultsLoading,
  } = useFetchArtworksByHexQuery(query, {
    skip: query === queryRef.current,
  });

  const handleCardClick = (result: ArtObject) => {
    navigate(`/${result?.objectNumber}`);
    dispatch(setQuery(""));
    dispatch(setSearchTerm(""));
  };

  return (
    <div className="grow w-full overflow-y-auto overflow-x-hidden p-1">
      <p className="py-3">
        Welcome <span className="text-gray-400"> {user?.email}</span>
      </p>
      {(isSearchLoading || isImageResultsLoading) && (
        <p className="absolute w-full h-full flex items-center justify-center mt-2 text-center text-gray-500">
          Loading...
        </p>
      )}
      <SearchBar />

      {(searchError || imageError) && <p className="mt-2 text-gray-500">Something went wrong</p>}

      {searchTerm !== "" && searchResults?.artObjects?.length > 0 ? (
        <div className="text-center">
          <h3 className="mt-4 text-xl text-center">{searchResults?.count ?? 0} image found</h3>
          <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
            {searchResults?.artObjects?.map((result: ArtObject) => (
              <Card key={result.id} data={result} onClick={() => handleCardClick(result)} />
            ))}
          </div>
        </div>
      ) : searchTerm !== "" ? (
        <h3 className="mt-4 text-xl text-center"> No image found</h3>
      ) : undefined}

      {query !== "" && imageResults?.artObjects?.length > 0 ? (
        <div className="text-center">
          <h3 className="mt-4 text-xl text-center">{imageResults?.count ?? 0} image found</h3>
          <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
            {imageResults?.artObjects?.map((result: ArtObject) => (
              <Card key={result.id} data={result} onClick={() => handleCardClick(result)} />
            ))}
          </div>
        </div>
      ) : query !== "" ? (
        <h3 className="mt-4 text-xl text-center"> {imageResults?.count} image found</h3>
      ) : undefined}
    </div>
  );
}

export default Home;
