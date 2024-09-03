import { IQuery } from "../redux";

interface IFilterItem {
  data: IQuery;
  filter: "q" | "color" | "maker";
  onClick: () => void;
}

const FilterItem = ({ data, filter, onClick }: IFilterItem) => {
  return (
    <span
      className="text-xs bg-orange-400 flex rounded w-min"
      style={{ backgroundColor: filter === "color" ? data.color : "" }}>
      {filter === "color" ? (
        <p className="rounded border-orange-400 p-2 m-2"></p>
      ) : (
        <p className="p-2 w-min">{data[filter]}</p>
      )}
      <img
        className=" w-[16px] h-[16px] cursor-pointer hover:scale-110"
        src="src/assets/close-icon.svg"
        alt=""
        onClick={onClick}
      />
    </span>
  );
};

export default FilterItem;
