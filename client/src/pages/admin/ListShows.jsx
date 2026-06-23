import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/Title'
import dateFormat from '../../lib/dateFormat'

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setShows([
      {
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00.000Z",
        showPrice: 59,
        occupiedSeats: { A1: 1, B1: 1, C1: 1 }
      }
    ])
    setLoading(false)
  }, [])

  return !loading ? (
    <div className="p-4 md:p-6">
      <Title text1="List" text2="Shows" />

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full min-w-600px text-sm text-left">
          
          <thead className="bg-primary/10 text-gray-300">
            <tr>
              <th className="p-3">Movie</th>
              <th className="p-3">Time</th>
              <th className="p-3">Bookings</th>
              <th className="p-3">Earnings</th>
            </tr>
          </thead>

          <tbody>
            {shows.map((show, i) => {
              const bookings = Object.keys(show.occupiedSeats || {}).length
              const earnings = bookings * show.showPrice

              return (
                <tr
                  key={i}
                  className="border-t border-gray-700 hover:bg-primary/5 transition"
                >
                  <td className="p-3 font-medium">
                    {show.movie?.title}
                  </td>

                  <td className="p-3 text-gray-300">
                    {dateFormat(show.showDateTime)}
                  </td>

                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded bg-gray-800 text-white text-xs">
                      {bookings}
                    </span>
                  </td>

                  <td className="p-3 font-semibold text-primary">
                    {currency}
                    {earnings}
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ListShows