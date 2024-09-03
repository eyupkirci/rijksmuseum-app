import { IQuery, QueryKeys } from "../types";

interface IFilterBadge {
  data: IQuery;
  filter: QueryKeys;
  onClick: () => void;
}

const FilterBagde = ({ data, filter, onClick }: IFilterBadge) => {
  return (
    <span
      className="text-xs bg-orange-400 flex rounded"
      style={{ backgroundColor: filter === "color" ? data.color : "" }}>
      {filter === "color" ? (
        <p className="rounded border-orange-400 p-2 m-2"></p>
      ) : (
        <p className="p-2">{data[filter]}</p>
      )}
      <img
        className="w-[16px] h-[16px] cursor-pointer hover:scale-110 pt-1 pr-1"
        src="src/assets/close-icon.svg"
        alt=""
        onClick={onClick}
      />
    </span>
  );
};

export default FilterBagde;
