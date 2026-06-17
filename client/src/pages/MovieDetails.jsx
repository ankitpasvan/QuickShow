import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import DateSelect from "../components/DateSelect";
import { PlayIcon, StarIcon, Heart } from "lucide-react";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const movie = dummyShowsData.find(
      (m) => String(m.id) === String(id)
    );

    setShow(movie || null);
    setLoading(false);
  }, [id]);

  // LOADING STATE
  if (loading) {
    return <Loading />;
  }

  // NOT FOUND STATE
  if (!show) {
    return (
      <div className="text-white text-center py-20 text-2xl">
        Movie Not Found
      </div>
    );
  }

  return (
    <div>
      <div className="px-6 md:px-16 lg:px-40 pt-30">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-8">

          <img
            src={show.backdrop_path}
            alt={show.title}
            className="rounded-xl w-72 h-96 object-cover"
          />

          <div className="relative flex flex-col gap-4">
            <BlurCircle top="100px" left="-100px" />

            <h1 className="text-4xl font-bold text-white">
              {show.title}
            </h1>

            <div className="flex items-center gap-2 text-gray-300">
              <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              {show.vote_average}
            </div>

            <p className="text-gray-400">{show.overview}</p>

            <p className="text-gray-400">
              Release Date: {show.release_date}
            </p>

            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                <PlayIcon className="w-5 h-5" />
                Watch Trailer
              </button>

              <a
                href="#dateSelect"
                className="px-6 py-3 bg-primary rounded-lg"
              >
                Buy Tickets
              </a>

              <button className="p-3 bg-gray-700 rounded-full">
                <Heart className="text-red-500 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CAST */}
        <h2 className="mt-12 text-2xl font-semibold text-white">
          Your Favourite Cast
        </h2>

        {show.casts?.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto mt-6 pb-4">
            {show.casts.map((cast, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ minWidth: "90px", height: "100px" }}
              >
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={cast.name}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <p className="text-sm mt-2 text-center">
                  {cast.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-4">
            No cast available.
          </p>
        )}

        {/* DATE SELECT */}
        <DateSelect id={id} dateTime={show.dateTime || {}} />

        {/* RECOMMENDATIONS */}
        <p className="text-lg font-medium mt-20 mb-8 text-white">
          You May Also Like
        </p>

        <div className="flex flex-wrap max-sm:justify-center gap-8">
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-20">
          <button
            onClick={() => navigate("/movies")}
            className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
          >
            Show more
          </button>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;