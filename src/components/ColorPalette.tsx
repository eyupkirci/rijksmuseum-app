import { Facet } from "../types";

type UltimateResults = {
  facets: Facet[];
};

interface IColorPalette {
  data: UltimateResults;
  handleColorFilter: (e: any) => void;
}
const ColorPalette = ({ data, handleColorFilter }: IColorPalette) => {
  return (
    <div
      className="max-w-max grid grid-cols-6 md:grid-cols-12 sm:grid-cols-9"
      onClick={handleColorFilter}>
      {data?.facets[6]?.facets?.map((item) => {
        const bg = item?.key.trim();
        return (
          <p
            key={item.key}
            id={item?.key.trim()}
            className={"w-8 h-8"}
            style={{ backgroundColor: bg }}></p>
        );
      })}
    </div>
  );
};

export default ColorPalette;
