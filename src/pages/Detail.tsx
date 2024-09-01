import { useParams } from "react-router-dom";
import { useFetchArtworkByIdQuery } from "../redux";

function Detail() {
  const params = useParams();
  const { data, isLoading } = useFetchArtworkByIdQuery(params?.objectNumber as string);

  return (
    <div className="grow w-full overflow-y-auto overflow-x-hidden">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="h-[400px] overflow-y-hidden">
            <img
              className="h-[400px] w-full transition delay-150 duration-700 ease-in-out object-scale-down hover:scale-150"
              src={data?.artObject?.webImage?.url}
              alt={data?.artObject?.title}
            />
          </div>
          <h2>Title: {data?.artObject?.title}</h2>
          {data?.artObject?.dating?.presentingDate && (
            <p>Date: {data?.artObject?.dating?.presentingDate}</p>
          )}
          {data?.artObject?.description && <p>Description: {data?.artObject?.description}</p>}
        </>
      )}
    </div>
  );
}

export default Detail;
