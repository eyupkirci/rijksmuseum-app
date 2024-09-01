import { ArtObject } from "../types";

function Card({ data, onClick }: { data: ArtObject; onClick: () => void }) {
  return (
    <div
      key={data.id}
      className="w-[300px] m-2 p-2 flex-col items-start justify-center text-center"
      onClick={onClick}>
      <img
        src={data?.webImage?.url}
        alt={data?.title}
        width={300}
        className="w-[300px] duration-300 hover:scale-90"
      />
      <p key={data?.id} className=" text-center text-gray-700">
        {data?.title}
      </p>
    </div>
  );
}

export default Card;
