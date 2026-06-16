import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { PlayIcon, StarIcon, Heart } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const movie = dummyShowsData.find(
      (m) => String(m.id) === String(id)
    );

    setShow(movie || null);
  }, [id]);

  if (!show) {
    return (
      <div className="text-white text-center py-20">
        Movie not found
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-30">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Movie Image */}
        <img
          src={show.backdrop_path}
          alt={show.title}
          className="rounded-xl w-72 h-96 object-cover"
        />

        {/* Details */}
        <div className="flex flex-col gap-3 relative">

          <BlurCircle top="100px" left="-100px" />

          <h1 className="text-3xl font-bold text-white">
            {show.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            {show.vote_average}
          </div>

          <p className="text-gray-400">
            {show.overview}
          </p>

          <p className="text-gray-400">
            Release: {show.release_date}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-4">

            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>

            <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
              <Heart className="w-5 h-5 text-red-500" />
            </button>

          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className="mt-10 text-white font-semibold">
        Your Favourite Cast
      </p>

      {show?.casts?.length > 0 ? (
        <div className="overflow-x-auto no-scrollbar mt-8 pb-4 flex gap-4">

          {show.casts.slice(0, 12).map((cast, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center min-w-[80px]"
            >
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : "https://via.placeholder.com/100"
                }
                alt={cast.name}
                className="rounded-full h-20 w-20 object-cover"
              />

              <p className="font-medium text-xs mt-3">
                {cast.name}
              </p>
            </div>
          ))}

        </div>
      ) : (
        <p className="text-gray-400 mt-4">
          No cast information available.
        </p>
      )}

    </div>
  );
};

export default MovieDetails;