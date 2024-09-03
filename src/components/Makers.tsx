import { useState } from "react";
import { Facet } from "../types";

type UltimateResults = {
  facets: Facet[];
};
interface IMakers {
  handleMakerFilter: (e: any) => void;
  data: UltimateResults;
}
const Makers = ({ handleMakerFilter, data }: IMakers) => {
  const [list, setList] = useState(10);
  return (
    <div>
      {data?.facets[0]?.facets?.map((item, index) => {
        if (index < list) {
          return (
            <p key={item.key} id={item?.key} onClick={(e) => handleMakerFilter(e)}>
              {item.key}
            </p>
          );
        }
      })}
      {data?.facets[0]?.facets.length > 0 && (
        <span onClick={() => setList(list + 10)}>... More</span>
      )}
    </div>
  );
};

export default Makers;
