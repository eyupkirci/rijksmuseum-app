import { useDispatch, useSelector } from "react-redux";
import { RootState, setQuery } from "../redux";
import { ArtObject, TSortOptions } from "../types";
import { Dispatch, SetStateAction } from "react";

interface SortBarProps {
  setlocalData: Dispatch<SetStateAction<ArtObject[]>>;
}
const SortBar = ({ setlocalData }: SortBarProps) => {
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.app);

  const handleSort = (sorter: string) => {
    dispatch(setQuery({ ...query, s: sorter as TSortOptions }));
    setlocalData([]);
  };

  return (
    <form className="flex flex-col justify-center items-center mt-2 rounded-lg">
      <select
        onChange={(e) => {
          handleSort(e.target.value);
        }}
        id="underline_select"
        className="py-2 px-3 text-sm text-gray-400">
        <option defaultValue={"relevance"} value="relevance">
          Sort results on relevance.
        </option>
        <option value="objecttype">Sort results on onject type.</option>
        <option value="chronologic">Sort results chronologically - ASC.</option>
        <option value="achronologic">Sort results chronologically - DESC</option>
        <option value="artist">Sort results on artist (a-z).</option>
        <option value="artistdesc">Sort results on artist (z-a)</option>
      </select>
    </form>
  );
};

export default SortBar;
