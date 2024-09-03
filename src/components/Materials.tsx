import { useState } from "react";
import { Facet, QueryKeys } from "../types";

type UltimateResults = {
  facets: Facet[];
};
interface IMaterials {
  onClick: (e: any, item: QueryKeys) => void;
  data: UltimateResults;
}
const Materials = ({ onClick, data }: IMaterials) => {
  const [list, setList] = useState(5);
  return (
    <div>
      {data?.facets[4]?.facets?.map((item, index) => {
        if (index < list) {
          return (
            <p key={item.key} id={item?.key} onClick={(e) => onClick(e.target.id, "material")}>
              {item.key}
            </p>
          );
        }
      })}
      {data?.facets[0]?.facets.length > 5 && (
        <span onClick={() => setList(list + 5)}>... More</span>
      )}
    </div>
  );
};

export default Materials;
