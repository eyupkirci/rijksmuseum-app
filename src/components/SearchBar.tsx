import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
interface ISearchBar {
  handleAddFilter: (value: string, key: string) => void;
}
const SearchBar: React.FC<ISearchBar> = ({ handleAddFilter }) => {
  const { query } = useSelector((state: RootState) => state.app);
  const [term, setTerm] = useState<string>("");
  const debouncedTerm = useDebounce(term, 500);

  useEffect(() => {
    handleAddFilter(debouncedTerm, "q");
  }, [debouncedTerm]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-4 text-center w-full relative sm:max-w-96">
        <input
          type="text"
          placeholder="Search..."
          className="ps-4 py-3 w-full border border-solid rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        {!query.q && <p className="text-sm text-gray-700">Type to search from Rijks Museum</p>}
      </div>
    </div>
  );
};

export default SearchBar;
