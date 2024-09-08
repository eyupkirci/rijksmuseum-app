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
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const dispatch = useDispatch();

  //global states
  const { user } = useSelector((state: RootState) => state.auth);
  const { query } = useSelector((state: RootState) => state.app);

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

  // Ref for search container
  const searchRef = useRef<HTMLDivElement>(null);

  //checks if scrolled till the end of main container
  useInfiniteScroll(handleScroll, isFetching, mainRef);

  //gets initial data when onload
  useEffect(() => {
    dispatch(setQuery({ ...query }));
  }, []);

  //to display spinner when fetching and back to top button
  useEffect(() => {}, [isFetching, dispatch]);

  return (
    <div className="grow w-full h-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row scroll-smooth">
      <main
        id="main"
        ref={mainRef}
        className="overflow-auto overflow-y-auto flex-1 p-6 bg-gray-100">
        <div ref={searchRef}>
          <SearchBar handleAddFilter={handleAddFilter} />
        </div>
        {error && <p className="py-2 text-gray-500">Something went wrong</p>}
        <SortBar setlocalData={setlocalData} />
        <CardList localData={localData} dataCount={data?.count} />
        {isFetching && <LoadingSpinner />}

        {mainRef?.current?.scrollTop > 70 && (
          <button
            onClick={() => {
              mainRef.current.scrollTop = 0;
            }}
            className="p-1 rounded-full fixed bottom-16 left-0 bg-transparent hover:opacity-75 focus:opacity-25">
            <svg
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </button>
        )}
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
    </div>
  );
}

export default Home;
