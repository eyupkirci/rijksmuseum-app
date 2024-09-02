import { useDispatch, useSelector } from "react-redux";
import { RootState, setSearchTerm, setQuery } from "../redux";
import { useState } from "react";
import { ImageToAverageColor, rgbToHex } from "../utils";
import { debounce } from "lodash";

const SearchBar = () => {
  const dispatch = useDispatch();

  const { searchTerm, query } = useSelector((state: RootState) => state.app);
  const [search, setSearch] = useState<string>(searchTerm);

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
      <div className="md:flex md:flex-row md:justify-center md:items-start gap-4 ">
        <div className="text-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="ps-4 py-3 w-full border border-solid rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              handleSearch(e.target.value);
              setSearch(e.target.value);
            }}
            value={search}
          />
          <svg
            className="absolute top-3 right-2"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 122.879 119.799"
            color="currenColor"
            enable-background="new 0 0 122.879 119.799">
            <g>
              <path d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z" />
            </g>
          </svg>

          {!searchTerm && <p className="text-sm text-gray-700">Type to search from Rijks Museum</p>}
          {searchTerm && <p className="mt-4 text-lg text-gray-700">Search Term: {searchTerm}</p>}
        </div>
        <div className="text-center">
          <div className="w-full">
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.4rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              onChange={handleImageUpload}
            />
            {!query && (
              <p className="text-sm text-gray-700">
                Upload an image to search similar colored artifacts
              </p>
            )}
            {query && (
              <p className="text-sm text-gray-700">Selected Image's Average Color: {query}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
