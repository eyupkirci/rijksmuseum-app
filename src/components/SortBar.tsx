import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setQuery } from "../redux";

const SortBar = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.app);

  const handleSort = useCallback(
    (sorter: string) => {
      //@ts-expect-error string | undefined
      dispatch(setQuery({ ...query, s: sorter }));
    },
    [query, dispatch]
  );

  return (
    <form className="p-4">
      <select
        onChange={(e) => {
          handleSort(e.target.value);
        }}
        id="underline_select"
        className="p-4 text-center w-full relative sm:max-w-96 text-gray-400">
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
