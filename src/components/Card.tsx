import { useState } from "react";
import { ArtObject } from "../types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Card({ data }: { data: ArtObject }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <a
      href={`${data?.objectNumber}`}
      target="_blank"
      key={data.id}
      className="w-[300px] m-2 p-2 items-center cursor-pointer">
      {!imageLoaded && <Skeleton height={300} width={300} className="bg-gray-500" />}

      <img
        src={data?.webImage?.url}
        alt={data?.title}
        width={300}
        className={`w-[300px] h-[300px] rounded-lg object-cover duration-300 hover:scale-90 ${
          imageLoaded ? "block" : "hidden"
        }`}
        onLoad={handleImageLoad}
      />

      <div>
        <p className="text-center text-gray-700">{data?.title || <Skeleton />}</p>
        <p className="text-xs text-center text-gray-400 capitalize hover:text-orange-400">
          {data?.principalOrFirstMaker || <Skeleton />}
        </p>
      </div>
    </a>
  );
}

export default Card;
