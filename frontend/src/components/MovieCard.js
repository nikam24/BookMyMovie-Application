import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movieId, title, releaseDate, imageUrl }) => {
  
  const navigate = useNavigate();

  const handleClick = () => { 
    console.log("Clicked on movie card");
    navigate("/book", {state: {movieId, title, releaseDate, imageUrl}});
  }
  
  return (
    <div className="shadow-xl shadow-black rounded-md hover:cursor-pointer" onClick={handleClick}>
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded-t-md" />
      <div className="p-3">
        <h3 className="text-gray-800 font-bold text-xl">{title}</h3>
        <p className="text-gray-500 text-sm">{releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
