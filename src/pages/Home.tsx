import SearchBar from "../components/SearchBar";
import { RootState, setQuery, useFetchUltimateArtworksQuery } from "../redux";
import { ArtObject } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import ColorPalette from "../components/ColorPalette";
import FilterItem from "../components/Filter";
import Makers from "../components/Makers";
import Materials from "../components/Materials";
import SortBar from "../components/SortBar";
import { debounce } from "lodash";

function Home() {
  const dispatch = useDispatch();

  //global states
  const { user } = useSelector((state: RootState) => state.auth);
  const { query } = useSelector((state: RootState) => state.app);

  const queryRef = useRef(query);

  //states
  const [page, setPage] = useState(query.p as number);
  const [localData, setlocalData] = useState<ArtObject[]>([]);
  const [search, setSearch] = useState<string>(query.q as string);

  //api result
  const { data, error, isLoading, isFetching } = useFetchUltimateArtworksQuery(query, {
    skip: query === queryRef.current,
  });
  const dataRef = useRef(data?.artObjects);

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
    if (key === "q") setSearch("");
  };

  const handleScrollDebounce = debounce(() => {
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

  //checks if scrolled till the end of main container
  useEffect(() => {
    const main = document.getElementById("main");

    const onScroll = () => {
      if (main) {
        const scrolledToBottom = main.scrollTop + main.clientHeight >= main.scrollHeight;
        if (scrolledToBottom && !isFetching) {
          handleScrollDebounce();
        }
      }
    };

    if (main) {
      main.addEventListener("scroll", onScroll);
    }

    return () => {
      if (main) {
        main.removeEventListener("scroll", onScroll);
      }
    };
  }, [page, isFetching, handleScrollDebounce]);

  //gets initial data when onload
  useEffect(() => {
    dispatch(setQuery({ ...query }));
  }, []);

  return (
    <div className="grow w-full h-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row">
      {/* Main Section */}
      <main id="main" className="overflow-auto overflow-y-auto flex-1 p-6 bg-gray-100">
        {/* SearchBar */}
        <SearchBar search={search} setSearch={setSearch} />
        {error && <p className="py-2 text-gray-500">Something went wrong</p>}
        <SortBar setlocalData={setlocalData} />
        {/* Search Results */}
        {localData?.length > 0 ? (
          <div
            id="card-container"
            className="text-center flex-col justify-center items-center gap-2 flex-wrap ">
            <h3 className="mt-4 text-xl text-center">{data?.count ?? 0} image found</h3>
            <div className="flex justify-center text-center flex-wrap  w-full gap-2">
              {localData?.map((result: ArtObject) => (
                <Card key={result.id} data={result} />
              ))}
            </div>
          </div>
        ) : query.q !== "" ? (
          <h3 className="mt-4 text-xl text-center"> No image found</h3>
        ) : undefined}
      </main>

      {/* Filter Section */}
      <aside
        id="filter"
        className="overflow-y-auto overflow-x-hidden hidden md:block md:w-1/5 bg-gray-200 p-6">
        {/* Welcome User */}
        <p className="py-3">
          Welcome <span className="text-gray-400"> {user?.email}</span>
        </p>
        {/* Filter */}
        <div className="mt-4">
          <div className="block">
            <h4 className="mt-4 font-[700]">Filters</h4>
            {query && (
              <div className="flex flex-row gap-5">
                {query.q && (
                  <FilterItem data={query} filter={"q"} onClick={() => handleRemoveFilter("q")} />
                )}
                {query.color && (
                  <FilterItem
                    data={query}
                    filter={"color"}
                    onClick={() => handleRemoveFilter("color")}
                  />
                )}
                {query.maker && (
                  <FilterItem
                    data={query}
                    filter={"maker"}
                    onClick={() => handleRemoveFilter("maker")}
                  />
                )}
                {query.material && (
                  <FilterItem
                    data={query}
                    filter={"material"}
                    onClick={() => handleRemoveFilter("material")}
                  />
                )}
              </div>
            )}
            <h4 className="mt-4 font-[700]">Main Color</h4>
            <ColorPalette onClick={handleAddFilter} data={data} />
            <h4 className="mt-4 font-[700]">PrincipalMakers</h4>
            <Makers onClick={handleAddFilter} data={data} />
            <h4 className="mt-4 font-[700]">Materials</h4>
            <Materials onClick={handleAddFilter} data={data} />
          </div>
        </div>
      </aside>

      {/*Loading */}
      {isLoading && (
        <p className="absolute w-full h-full flex items-center justify-center mt-2 text-center text-gray-500">
          Loading...
        </p>
      )}
    </div>
  );
}

export default Home;
