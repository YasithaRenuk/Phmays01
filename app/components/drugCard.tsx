import React from "react";

interface DrugCardProps {
  name: string;
  quantity: string | number; // Adjust type as per your requirement
  measurement: string;
}

const DrugCard: React.FC<DrugCardProps> = ({ name, quantity, measurement }) => {
  return (
    <div className="card w-60 shadow-m h-30">
      <div>
        <h2>{name}</h2>
        <p>{`${quantity} ${measurement}`}</p>
      </div>
    </div>
  );
};

export default DrugCard;
