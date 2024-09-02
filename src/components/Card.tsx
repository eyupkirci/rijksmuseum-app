import { ArtObject } from "../types";

function Card({ data, onClick }: { data: ArtObject; onClick: () => void }) {
  return (
    <div
      key={data.id}
      className="w-[300px] m-2 p-2 flex-col items-start justify-center text-center cursor-pointer"
      onClick={onClick}>
      <img
        src={data?.webImage?.url ?? "src/assets/default-card-image.svg"}
        alt={data?.title}
        width={300}
        className="w-[300px] duration-300 hover:scale-90"
      />
      <div>
        <p className="text-center text-gray-700">{data?.title}</p>
        <a href="#" className="text-xs text-center text-gray-400 capitalize hover:text-orange-400">
          {data?.principalOrFirstMaker}
        </a>
      </div>
    </div>
  );
}

export default Card;
