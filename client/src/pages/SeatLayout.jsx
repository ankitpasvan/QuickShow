import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import {
  dummyShowsData,
  dummyDateTimeData,
  assets,
} from "../assets/assets";
import { ArrowRightIcon, Clock } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
  ];

  useEffect(() => {
    const movie = dummyShowsData.find(
      (item) => String(item.id) === String(id)
    );

    if (movie) {
      setShow({
        movie,
        dateTime: dummyDateTimeData || {},
      });
    }
  }, [id]);

  if (!show) return <Loading />;

  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : null;

  const timings =
    (formattedDate && show.dateTime?.[formattedDate]) ||
    Object.values(show.dateTime || {})?.[0] ||
    [];

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast.error("You can only select 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2 justify-center">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;

        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary/60 text-xs transition
              ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 gap-6">

      {/* TIMINGS */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-xl py-8 h-max md:sticky md:top-30">

        <p className="text-xl font-semibold px-6 mb-4">
          Available Timings
        </p>

        <div className="space-y-2">
          {timings?.length > 0 ? (
            timings.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-3 w-full px-6 py-3 transition
                  ${
                    selectedTime?.time === item.time
                      ? "bg-primary text-white"
                      : "hover:bg-primary/20"
                  }`}
              >
                <Clock size={18} />
                <span>{isoTimeFormat(item.time)}</span>
              </button>
            ))
          ) : (
            <p className="px-6 text-gray-400">
              No timings available
            </p>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        <h1 className="text-3xl font-bold text-white">
          Select Your Seats
        </h1>

        <p className="text-gray-400 mt-2">
          {show.movie.title}
        </p>

        {selectedTime && (
          <p className="text-primary mt-3">
            Selected Time: {isoTimeFormat(selectedTime.time)}
          </p>
        )}

        <div className="mt-10 relative flex flex-col items-center">

          <BlurCircle top="-100px" left="100px" />
          <BlurCircle bottom="0" right="0" />

          <h2 className="text-2xl font-semibold mb-5">
            Select Your Seat
          </h2>

          <img
            src={assets?.screenImage || ""}
            alt="screen"
            className="w-full max-w-3xl"
          />

          <p className="text-gray-400 mt-3 mb-6">
            SCREEN SIDE
          </p>

          {/* SEATS */}
          <div className="flex flex-col items-center text-xs text-gray-300">

            {/* TOP ROWS */}
            <div className="flex gap-12 justify-center">
              {groupRows.slice(0, 2).map((group) => (
                <div key={group.join("-")}>
                  {group.map((row) => renderSeats(row))}
                </div>
              ))}
            </div>

            {/* BOTTOM ROWS */}
            <div className="flex gap-12 justify-center mt-8">
              {groupRows.slice(2).map((group) => (
                <div key={group.join("-")}>
                  {group.map((row) => renderSeats(row))}
                </div>
              ))}
            </div>

          </div>

          {/* CHECKOUT */}
          <button
            onClick={() => navigate("/my-booking")}
            className="flex items-center gap-2 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
          >
            Proceed to Checkout
            <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
          </button>

        </div>
      </div>

    </div>
  );
};

export default SeatLayout;