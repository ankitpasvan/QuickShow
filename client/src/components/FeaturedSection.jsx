import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { dummyShowsData } from "../assets/assets";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-24 xl:px-44 overflow-hidden">
      {/* Header */}
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />

        <p className="text-gray-300 font-medium text-lg">
          Now Showing
        </p>

        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0);
          }}
          className="group flex items-center gap-1 text-sm text-gray-300 cursor-pointer hover:text-white transition"
        >
          View All
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dummyShowsData.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Show More */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;