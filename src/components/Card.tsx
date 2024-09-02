import { useState } from "react";
import { ArtObject } from "../types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Card({ data, onClick }: { data: ArtObject; onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div
      key={data.id}
      className="w-[300px] m-2 p-2 flex-col items-start justify-center text-center cursor-pointer"
      onClick={onClick}>
      {!imageLoaded && <Skeleton height={300} width={300} className="bg-gray-500" />}

      <img
        src={data?.webImage?.url}
        alt={data?.title}
        width={300}
        className={`w-[300px] h-[300px] object-cover duration-300 hover:scale-90 ${
          imageLoaded ? "block" : "hidden"
        }`}
        onLoad={handleImageLoad}
      />

      <div>
        <p className="text-center text-gray-700">{data?.title || <Skeleton />}</p>
        <a href="#" className="text-xs text-center text-gray-400 capitalize hover:text-orange-400">
          {data?.principalOrFirstMaker || <Skeleton />}
        </a>
      </div>
    </div>
  );
}

export default Card;
