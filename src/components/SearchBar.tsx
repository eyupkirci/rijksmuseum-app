import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { RootState, setSearchTerm } from "../redux";
import { useState } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.app);
  const [search, setSearch] = useState(searchTerm);

  const handleSearch = debounce((s: string) => {
    dispatch(setSearchTerm(s));
  }, 600);

  return (
    <div className="flex flex-col justify-center items-center">
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

      {searchTerm && <p className="mt-4 text-lg text-gray-700">Search Term: {searchTerm}</p>}
      {!searchTerm && (
        <p className="mt-1 text-sm text-gray-700">
          Type to search from Rijks Museum Digital Archieve
        </p>
      )}
    </div>
  );
};

export default SearchBar;
