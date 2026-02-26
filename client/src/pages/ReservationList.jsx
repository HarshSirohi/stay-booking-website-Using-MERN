import { useEffect, useState } from "react";
import "../styles/List.scss";
import "../styles/ListEnhanced.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const reservationList = user?.reservationList || [];

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      dispatch(setReservationList(data));
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getReservationList();
    }
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>

      <div className="list">
        {reservationList.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          reservationList.map((reservation) => (
            <ListingCard
              key={reservation._id}
              listingId={reservation.listingId._id}
              creator={reservation.hostId}
              listingPhotoPaths={
                reservation.listingId.listingPhotoPaths
              }
              city={reservation.listingId.city}
              province={reservation.listingId.province}
              country={reservation.listingId.country}
              category={reservation.listingId.category}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              totalPrice={reservation.totalPrice}
              booking={true}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default ReservationList;