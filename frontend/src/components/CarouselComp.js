import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const CarouselComp = ({movies}) => {
  return (
    <AliceCarousel mouseTracking items={movies.map((movie) => (
      <img alt='its good' src={movie.poster_path} onDragStart={handleDragStart} className="w-full h-[600px] bg-black bg-opacity-90 object-contain m-auto drop-shadow-2xl " />
    ))} />
  );
}

export default CarouselComp;