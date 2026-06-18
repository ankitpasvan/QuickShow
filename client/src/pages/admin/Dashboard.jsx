import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UserIcon,
  StarIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import BlurCircle from "../../components/BlurCircle";
import dateFormat from "../../lib/dateFormat";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    { title: "Total Bookings", value: dashboardData.totalBookings || 0, icon: ChartLineIcon },
    { title: "Total Revenue", value: currency + dashboardData.totalRevenue, icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dashboardData.activeShows?.length || 0, icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUser || 0, icon: UserIcon },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData || {});
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <div className="flex-1 p-6 md:p-10 overflow-auto">

      <BlurCircle top="-100px" left="0" />

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-primary/10 border border-primary/20 rounded-xl p-5 flex items-center gap-4"
            >
              <Icon className="w-7 h-7 text-primary" />

              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE SHOWS */}
      <h2 className="text-2xl font-semibold mb-5">Active Shows</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(dashboardData.activeShows || []).map((show) => (
          <div
            key={show._id}
            className="rounded-xl overflow-hidden bg-primary/10 border border-primary/20 hover:-translate-y-1 transition"
          >
            <img
              src={show.movie?.poster_path}
              className="w-full h-64 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold truncate">
                {show.movie?.title}
              </p>

              <div className="flex items-center justify-between mt-2">
                <p className="font-bold text-lg">
                  {currency}{show.showPrice}
                </p>

                <p className="flex items-center gap-1 text-sm text-gray-400">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {(show.movie?.vote_average || 0).toFixed(1)}
                </p>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                {show.showDateTime ? dateFormat(show.showDateTime) : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;