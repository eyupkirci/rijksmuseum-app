import { useState } from "react";
import { Facet, QueryKeys } from "../types";
import { capitalize } from "lodash";

type UltimateResults = {
  facets: Facet[];
};
interface IMaterials {
  onClick: (e: string, item: QueryKeys) => void;
  data: UltimateResults;
}
const Materials = ({ onClick, data }: IMaterials) => {
  const [list, setList] = useState(5);
  return (
    <div>
      {data?.facets[4]?.facets?.map((item, index) => {
        if (index < list) {
          return (
            <p
              className="hover:text-orange-400"
              key={item.key}
              id={item?.key}
              onClick={(e) => onClick((e.target as HTMLElement).id, "material")}>
              {capitalize(item.key)}
            </p>
          );
        }
      })}
      {data?.facets[0]?.facets.length > 5 && (
        <span onClick={() => setList(list + 5)} className="hover:text-orange-400">
          ... More
        </span>
      )}
    </div>
  );
};

export default Materials;
