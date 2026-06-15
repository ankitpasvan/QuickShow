import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircle } from "lucide-react";

const TrailerSection = () => {
  const [trailer, setTrailer] = useState(dummyTrailers?.[0]);

  if (!trailer || !trailer.videoUrl) {
    return (
      <div className="text-white text-center py-20">
        Trailer not available
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">

      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto mb-6">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />

        {/* MAIN VIDEO */}
        <ReactPlayer
          url={trailer.videoUrl}
          playing={true}
          controls={true}
          className="mx-auto max-w-full"
          width="960px"
          height="540px"
        />

        {/* THUMBNAILS */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
          {dummyTrailers.map((item) => (
            <div
              key={item.videoUrl}
              className="relative cursor-pointer hover:-translate-y-1 transition duration-300"
              onClick={() => setTrailer(item)}
            >
              <img
                src={item.image}
                alt="trailer"
                className="rounded-lg w-full h-full object-cover brightness-75"
              />

              <PlayCircle
                className="absolute top-1/2 left-1/2 w-6 h-6 text-white transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default TrailerSection;