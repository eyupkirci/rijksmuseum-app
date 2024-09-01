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

  const queryRef = useRef(query);
  const searchTermRef = useRef(searchTerm);

  const {
    data: searchResults,
    error,
    isLoading,
  } = useFetchArtworksQuery(searchTerm, {
    skip: searchTerm === searchTermRef.current,
  });

  const { data: imageResults, isLoading: isImageResultsLoading } = useFetchArtworksByHexQuery(
    query,
    {
      skip: query === queryRef.current,
    }
  );

  const handleCardClick = (result: ArtObject) => {
    navigate(`/${result?.objectNumber}`);
    dispatch(setQuery(""));
    dispatch(setSearchTerm(""));
  };

  return (
    <div className="grow w-full overflow-y-auto overflow-x-hidden">
      {(isLoading || isImageResultsLoading) && (
        <p className="absolute w-full h-full flex items-center justify-center mt-2 text-center text-gray-500">
          Loading...
        </p>
      )}
      <SearchBar />

      {error && <p className="mt-2 text-gray-500">Something went wrong</p>}

      {searchTerm !== "" && searchResults?.artObjects?.length > 0 ? (
        <>
          <h3 className="mt-4 text-xl text-center">{searchResults?.count} image found</h3>
          <div className="flex mt-4 items-start justify-center flex-wrap gap-4">
            {searchResults?.artObjects?.map((result: ArtObject) => (
              <Card key={result.id} data={result} onClick={() => handleCardClick(result)} />
            ))}
          </div>
        </>
      ) : searchTerm !== "" ? (
        <h3 className="mt-4 text-xl text-center"> No image found</h3>
      ) : undefined}

      {query !== "" && imageResults?.artObjects?.length > 0 ? (
        <>
          <h3 className="mt-4 text-xl text-center">{imageResults?.count} image found</h3>
          <div className="flex mt-4 items-start flex-wrap gap-4">
            {imageResults?.artObjects?.map((result: ArtObject) => (
              <Card key={result.id} data={result} onClick={() => handleCardClick(result)} />
            ))}
          </div>
        </>
      ) : query !== "" ? (
        <h3 className="mt-4 text-xl text-center"> {imageResults?.count} image found</h3>
      ) : undefined}
    </div>
  );
}

export default Home;
