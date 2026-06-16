import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";

const Favorite = () => {
  return dummyShowsData.length > 0 ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">

      <BlurCircle top="150px" left="0px"/>
      <BlurCircle bottom="50px" right="50px" />
      <h1 className="text-3xl font-bold mb-8">Your Favorites Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyShowsData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Your Favorites Movies</h1>
      <p className="mt-4 text-gray-400">No movies available.</p>
    </div>
  );
};

export default Favorite;