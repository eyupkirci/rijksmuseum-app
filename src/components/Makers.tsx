import { useState } from "react";
import { Facet } from "../types";

type UltimateResults = {
  facets: Facet[];
};
interface IMakers {
  onClick: (e: string, item: string) => void;
  data: UltimateResults;
}
const Makers = ({ onClick, data }: IMakers) => {
  const [list, setList] = useState(10);
  return (
    <div>
      {data?.facets[0]?.facets?.map((item, index) => {
        if (index < list) {
          return (
            <p
              className="hover:text-orange-400"
              key={item.key}
              id={item?.key}
              onClick={(e) => onClick((e.target as HTMLElement).id, "maker")}>
              {item.key}
            </p>
          );
        }
      })}
      {data?.facets[0]?.facets.length > 10 && (
        <span onClick={() => setList(list + 10)} className="hover:text-orange-400">
          ... More
        </span>
      )}
    </div>
  );
};

export default Makers;
