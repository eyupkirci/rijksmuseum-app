import { Facet } from "../types";

type UltimateResults = {
  facets: Facet[];
};

interface IColorPalette {
  data: UltimateResults;
  onClick: (e: unknown, item: string) => void;
}
const ColorPalette = ({ data, onClick }: IColorPalette) => {
  return (
    <div
      className="max-w-max grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
      onClick={(e) => onClick(e.target.id, "color")}>
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
