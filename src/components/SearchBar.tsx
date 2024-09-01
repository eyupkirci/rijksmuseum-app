import { useDispatch, useSelector } from "react-redux";
import { RootState, setSearchTerm, setQuery } from "../redux";
import { useState } from "react";
import { ImageToAverageColor, rgbToHex } from "../utils";
import { debounce } from "lodash";

const SearchBar = () => {
  const dispatch = useDispatch();

  const { searchTerm, query } = useSelector((state: RootState) => state.app);

  const [search, setSearch] = useState<string>(searchTerm);
  const [averageColor, setAverageColor] = useState<string>(query);

  const handleSearch = debounce((s: string) => {
    dispatch(setSearchTerm(s));
    dispatch(setQuery(""));
  }, 1000);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target?.readyState === FileReader.DONE) {
          const imgSrc = e.target.result as string;

          try {
            //@ts-expect-error unknown
            const [r, g, b] = await ImageToAverageColor(imgSrc);
            const hexColor = rgbToHex(r, g, b).toUpperCase();
            console.log("Computed Average Color:", hexColor);

            setAverageColor(hexColor);
            dispatch(setQuery(hexColor));
            dispatch(setSearchTerm(""));
          } catch (error) {
            console.error("Error extracting average color:", error);
          }
        } else {
          console.error("File reading was not successful.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-start gap-4">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg shadow-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              handleSearch(e.target.value);
              setSearch(e.target.value);
            }}
            value={search}
          />
          {!searchTerm && (
            <p className="mt-1 text-sm text-gray-700">Type to search from Rijks Museum</p>
          )}
          {searchTerm && <p className="mt-4 text-lg text-gray-700">Search Term: {searchTerm}</p>}
        </div>
        <div>
          <div className="w-96">
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          {!query && (
            <p className="mt-1 text-sm text-gray-700">
              Upload an image to search similar colored artifacts
            </p>
          )}
          {query && (
            <p className="mt-4 text-lg text-gray-700">Selected Image's Average Color: {query}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
