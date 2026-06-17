import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlurCircle from "./BlurCircle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ id }) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  const onBookHandler = () => {
    if (!selectedDate) {
      return toast.error("Please select a date");
    }

    navigate(`/movies/${id}/${selectedDate.toISOString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <section id="dateSelect" className="px-6 md:px-16 lg:px-40 mt-24">
      <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 overflow-hidden">

        <BlurCircle top="-120px" left="-120px" />
        <BlurCircle bottom="-120px" right="-120px" />

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Select Date
            </h2>
            <p className="text-gray-400 mt-2">
              Pick your favourite date
            </p>
          </div>

          <button
            onClick={onBookHandler}
            className="bg-primary px-8 py-3 rounded-xl hover:scale-105 transition text-white"
          >
            Book Now
          </button>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-5">
          <button className="h-12 w-12 rounded-full bg-white/10 flex justify-center items-center">
            <ChevronLeft />
          </button>

          <div className="flex gap-4 overflow-x-auto no-scrollbar flex-1">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`
                  flex flex-col justify-center items-center rounded-2xl transition-all duration-300 border

                  ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? "bg-primary text-white scale-105 border-primary"
                      : "bg-white/5 hover:bg-primary/20 border-white/10"
                  }
                `}
                style={{
                  minWidth: "90px",
                  height: "100px",
                }}
              >
                <span className="text-xs uppercase">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>

                <span className="text-3xl font-bold">
                  {date.getDate()}
                </span>

                <span className="text-sm">
                  {date.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </button>
            ))}
          </div>

          <button className="h-12 w-12 rounded-full bg-white/10 flex justify-center items-center">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DateSelect;