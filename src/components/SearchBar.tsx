import { useDispatch, useSelector } from "react-redux";
import { initialQuery, RootState, setQuery } from "../redux";
import { useEffect } from "react";

interface ISearchBar {
  search: string;
  setSearch: (e: string) => void;
}
const SearchBar = ({ search, setSearch }: ISearchBar) => {
  const dispatch = useDispatch();

  const { query } = useSelector((state: RootState) => state.app);

  const handleSearch = (s: string) => {
    dispatch(setQuery({ ...initialQuery, q: s }));
  };

  useEffect(() => {}, [query, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-4 text-center w-full relative sm:max-w-96">
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
        {!query.q && <p className="text-sm text-gray-700">Type to search from Rijks Museum</p>}
      </div>
    </div>
  );
};

export default SearchBar;
