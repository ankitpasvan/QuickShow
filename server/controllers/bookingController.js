import Booking from "../models/Booking";
import Show from "../models/Show";
// function to check availability of selected seats for movie

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;
    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // check if the seat is available for the seleceted show
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

    if (!isAvailable) {
      return res.json({
        success: false,
        message: " Selected Seats are not available.",
      });
    }
    // Get the show details
    const showData = await Show.findById(showId).populate("movie");

    // create new booking
    const await = new Booking();
  } catch (error) {}
};
