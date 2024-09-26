import React from "react";
import { Link } from "react-router-dom";

const Card = ({ soil }) => {
  console.log(soil);

  return (
    <div className="w-[26vw] h-[60vh] flex flex-col p-5 ml-6 shadow-[8px_10px_20px_3px_rgba(200,200,250,0.3)] object-cover">
      <div className="w-full h-[80%]">
        <img
          className="w-full h-full object-cover"
          src={soil.SoilImage?.url || "/default-profile.png"} // Handle missing profilePic
          alt={soil.name}
        />
      </div>
      <div className="h-[15%] mt-3">
        <h3>{soil.name}</h3>
        <p>{soil.type}</p>
        <Link to={`/soil/${soil._id}`}>View details</Link>
      </div>
    </div>
  );
};

export default Card;
