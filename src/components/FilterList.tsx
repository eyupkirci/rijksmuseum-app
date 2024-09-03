import React from "react";
import FilterBadge from "./FilterBadge"; // Assuming FilterItem is in the same directory

interface FilterListProps {
  query: {
    q?: string;
    color?: string;
    maker?: string;
    material?: string;
  };
  handleRemoveFilter: (filter: string) => void;
}

const FilterList: React.FC<FilterListProps> = ({ query, handleRemoveFilter }) => {
  return (
    <>
      {query && (
        <div className="flex flex-row gap-5">
          {query.q && (
            <FilterBadge data={query} filter={"q"} onClick={() => handleRemoveFilter("q")} />
          )}
          {query.color && (
            <FilterBadge
              data={query}
              filter={"color"}
              onClick={() => handleRemoveFilter("color")}
            />
          )}
          {query.maker && (
            <FilterBadge
              data={query}
              filter={"maker"}
              onClick={() => handleRemoveFilter("maker")}
            />
          )}
          {query.material && (
            <FilterBadge
              data={query}
              filter={"material"}
              onClick={() => handleRemoveFilter("material")}
            />
          )}
        </div>
      )}
    </>
  );
};

export default FilterList;
