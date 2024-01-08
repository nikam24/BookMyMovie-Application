import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselComp from "./CarouselComp";
import MovieCard from "./MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies"));
    
    if(storedMovies){
      console.log("Movies already fetched");
      setMovies(storedMovies);
    }
    else if(movies.length === 0){
      console.log("Fetching movies");
      fetchMovies();
    }

    // if(movies.length === 0){
    //   fetchMovies();
    // }
    // else{
    //   console.log("Movies already fetched");
    // }
  }, [movies.length]);

  const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://movies-api14.p.rapidapi.com/shows',
        headers: {
          'X-RapidAPI-Key': 'f36204fca6msh3e93ff91695cc7fp1c061ejsnc6122b8a6a29',
          'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      let list = []
      for (let i = 0; i < 10; i++) {
        list.push(response.data.movies[i])
      }
      setMovies(list);
      console.log("Got movies: ", response.data.movies);

      localStorage.setItem("movies", JSON.stringify(list));

    };

  return (
    <div className="bg-white">
      <CarouselComp movies={movies} />
      <div className="movie-cards mt-10">
        <h2 className="text-gray-800 font-bold text-2xl">Now Playing Movies</h2>
        <div className="grid grid-cols-3 gap-5">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              movieId={movie._id}
              title={movie.title}
              releaseDate={movie.first_aired}
              imageUrl={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
