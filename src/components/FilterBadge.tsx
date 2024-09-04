import { IQuery, QueryKeys } from "../types";

interface IFilterBadge {
  data: IQuery;
  filter: QueryKeys;
  onClick: () => void;
}

const FilterBagde = ({ data, filter, onClick }: IFilterBadge) => {
  if (filter === "color") {
    return (
      <div className="flex">
        <span
          className="w-[1rem] h-[1rem] px-2 rounded"
          style={{ backgroundColor: data.color }}></span>
        <img
          className="p-[3px] w-[1rem] h-[1rem] rounded cursor-pointer hover:bg-orange-400"
          src="src/assets/close-icon.svg"
          alt=""
          onClick={onClick}
        />
      </div>
    );
  }

  return (
    <span className="flex">
      <p className="text-xs rounded p-1 bg-orange-400">{data[filter]}</p>
      <img
        className="p-[3px] w-[1rem] h-[1rem] rounded cursor-pointer hover:bg-orange-400"
        src="src/assets/close-icon.svg"
        alt=""
        onClick={onClick}
      />
    </span>
  );
};

export default FilterBagde;
