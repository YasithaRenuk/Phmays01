import React from "react";

const drugCard = ({name,quantity,measurement}) => {
  return (
    <div className="card w-60 shadow-m h-30">
      <div className="">
        <h2 className="">{name}</h2>
        <p>{quantity+" "+measurement}</p>
      </div>
    </div>
  );
};

export default drugCard;
