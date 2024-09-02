import { useParams } from "react-router-dom";
import { useFetchArtworkByIdQuery } from "../redux";

const InfoText = ({ info, title }: { info: string | string[]; title: string }) => {
  return (
    <div className="mt-2">
      <span className="text-gray-600 font-[600] me-2">{title}:</span>
      <span className="text-gray-500 capitalize">
        {typeof info === "string" ? info : info.map((item: string) => item).join(" - ")}
      </span>
    </div>
  );
};

function Detail() {
  const params = useParams();

  const { data, isLoading } = useFetchArtworkByIdQuery(params?.objectNumber as string);

  return (
    <div className="grow w-full overflow-y-auto overflow-x-hidden text-enter p-2">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="h-[400px] overflow-y-hidden">
            <img
              className="h-[400px] w-full transition delay-150 duration-700 ease-in-out object-scale-down hover:scale-150"
              src={data?.artObject?.webImage?.url ?? "src/assets/default-card-image.svg"}
              alt={data?.artObject?.title}
            />
          </div>

          <InfoText title="Title" info={data?.artObject?.title} />

          <InfoText title="Title" info={data?.artObject?.dating?.presentingDate} />

          {data?.artObject?.description && (
            <InfoText title="Description" info={data?.artObject?.description} />
          )}
          {data?.artObject?.materials && (
            <InfoText title="Materials" info={data?.artObject?.materials} />
          )}
          {data?.artObject?.principalMaker && (
            <InfoText title="Principal Maker" info={data?.artObject?.principalMaker} />
          )}
        </>
      )}
    </div>
  );
}

export default Detail;
