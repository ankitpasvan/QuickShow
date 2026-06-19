import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircle } from "lucide-react";

const TrailerSection = () => {
  const validTrailers = dummyTrailers?.filter(t => t?.videoUrl);

  const [trailer, setTrailer] = useState(validTrailers?.[0] || null);

  if (!trailer) {
    return (
      <div className="text-white text-center py-20">
        No trailer available
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">

      <p className="text-gray-300 font-medium text-lg max-w-5xl mx-auto mb-6">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />

        {/* MAIN VIDEO */}
        <div className="flex justify-center">
          <ReactPlayer
            url={trailer.videoUrl}
            controls
            playing={false}
            width="100%"
            height="500px"
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        </div>

        {/* THUMBNAILS */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">

          {validTrailers.map((item) => (
            <div
              key={item.videoUrl}
              className="relative cursor-pointer hover:-translate-y-1 transition"
              onClick={() => setTrailer(item)}
            >
              <img
                src={item.image}
                alt="trailer"
                className="rounded-lg w-full object-cover brightness-75"
              />

              <PlayCircle className="absolute top-1/2 left-1/2 w-6 h-6 text-white transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TrailerSection;