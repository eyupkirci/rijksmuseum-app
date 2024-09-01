import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { RootState, useFetchArtworksQuery } from "../redux";
import { ArtObject } from "../types";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();

  const { searchTerm } = useSelector((state: RootState) => state.app);

  const {
    data: searchResults,
    error,
    isLoading,
  } = useFetchArtworksQuery(searchTerm, {
    skip: searchTerm === "",
  });

  return (
    <div className="grow w-full overflow-y-auto overflow-x-hidden">
      <SearchBar />

      {isLoading && <p className="mt-2 text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-gray-500">Something went wrong</p>}
      {searchTerm && <h3 className="mt-4 text-xl text-center">Results</h3>}

      {searchResults?.artObjects && (
        <div className="flex mt-4 items-center justify-center flex-wrap gap-4">
          {searchResults?.artObjects?.map((result: ArtObject) => (
            <div
              className="w-[300px] m-2 p-2 flex-col items-center justify-center text-center"
              onClick={() => {
                navigate(`/${result?.objectNumber}`);
              }}>
              <img src={result?.webImage?.url} alt={result?.title} width={300} />
              <p key={result?.id} className=" text-center text-gray-700">
                {result?.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
