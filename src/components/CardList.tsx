import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux"; // Adjust import path to where your RootState is defined
import { ArtObject } from "../types";
import Card from "./Card";

interface CardListProps {
  localData: ArtObject[];
  dataCount: number | undefined;
}

const CardList: React.FC<CardListProps> = ({ localData, dataCount }) => {
  const query = useSelector((state: RootState) => state.app.query);

  return (
    <>
      {localData?.length > 0 ? (
        <div
          id="card-container"
          className="text-center flex-col justify-center items-center gap-2 flex-wrap ">
          <h3 className="mt-4 text-xl text-center">{dataCount ?? 0} image found</h3>
          <div className="flex justify-center text-center flex-wrap  w-full gap-2">
            {localData?.map((result: ArtObject) => (
              <Card key={result.id} data={result} />
            ))}
          </div>
        </div>
      ) : query.q !== "" ? (
        <h3 className="mt-4 text-xl text-center"> No image found</h3>
      ) : null}
    </>
  );
};

export default CardList;
