import SearchBar from "../components/SearchBar";
import { RootState, setQuery, useFetchUltimateArtworksQuery } from "../redux";
import { ArtObject } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ColorPalette from "../components/ColorPalette";
import Makers from "../components/Makers";
import Materials from "../components/Materials";
import SortBar from "../components/SortBar";
import { throttle } from "lodash";
import CardList from "../components/CardList";
import FilterList from "../components/FilterList";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function Home() {
  const dispatch = useDispatch();

  //global states
  const { user } = useSelector((state: RootState) => state.auth);
  const { query, isLoading } = useSelector((state: RootState) => state.app);

  const queryRef = useRef(query);

  //states
  const [page, setPage] = useState(query.p as number);
  const [localData, setlocalData] = useState<ArtObject[]>([]);

  //api result
  const { data, error, isFetching } = useFetchUltimateArtworksQuery(query, {
    skip: query === queryRef.current,
  });
  const dataRef = useRef(data?.artObjects ?? []);

  const handleAddFilter = (value: string, key: string) => {
    const _query = { ...query, [key]: value, p: 1 };
    setPage(1);
    setlocalData([]);
    dispatch(setQuery(_query));
  };

  const handleRemoveFilter = (key: string) => {
    const _query = { ...query, [key]: "", p: 1 };
    setPage(1);
    setlocalData([]);
    dispatch(setQuery(_query));
  };

  const handleScroll = throttle(() => {
    if (data?.count > dataRef.current.length) {
      const newP = Number(page + 1);
      setPage(newP);
      dispatch(setQuery({ ...query, p: newP }));
    }
  }, 1000);

  //update data length
  useEffect(() => {
    if (dataRef.current !== data?.artObjects) {
      if (queryRef?.current !== query) {
        //filter existing data among new coming data
        const newArtObjects = data.artObjects.filter(
          (obj: ArtObject) => !localData.some((existingObj) => existingObj.id === obj.id)
        );

        const _data = localData?.concat(newArtObjects);
        setlocalData(_data);
        queryRef.current = query;
        dataRef.current = _data;
      }
    }
  }, [data]);

  // Ref for main container
  const mainRef = useRef<HTMLDivElement>(null);

  //checks if scrolled till the end of main container
  useInfiniteScroll(handleScroll, isFetching, mainRef);

  //gets initial data when onload
  useEffect(() => {
    dispatch(setQuery({ ...query }));
  }, []);

  return (
    <div className="grow w-full h-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row">
      <main
        id="main"
        ref={mainRef}
        className="overflow-auto overflow-y-auto flex-1 p-6 bg-gray-100">
        <SearchBar handleAddFilter={handleAddFilter} />
        {error && <p className="py-2 text-gray-500">Something went wrong</p>}
        <SortBar setlocalData={setlocalData} />
        <CardList localData={localData} dataCount={data?.count} />
      </main>

      <aside
        id="filter"
        className="overflow-y-auto overflow-x-hidden hidden md:block md:w-1/5 bg-gray-200 p-6">
        <p className="py-3">
          Welcome <span className="text-gray-400"> {user?.email}</span>
        </p>
        <div className="mt-4">
          <div className="block">
            <h4 className="mt-4 font-[700]">Filters</h4>
            <FilterList query={query} handleRemoveFilter={handleRemoveFilter} />
            <h4 className="mt-4 font-[700]">Main Color</h4>
            <ColorPalette onClick={handleAddFilter} data={data} />
            <h4 className="mt-4 font-[700]">PrincipalMakers</h4>
            <Makers onClick={handleAddFilter} data={data} />
            <h4 className="mt-4 font-[700]">Materials</h4>
            <Materials onClick={handleAddFilter} data={data} />
          </div>
        </div>
      </aside>

      {isLoading && (
        <p className="absolute w-full h-full flex items-center justify-center mt-2 text-center text-gray-500">
          Loading...
        </p>
      )}
    </div>
  );
}

export default Home;
