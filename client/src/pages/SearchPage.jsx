import { useParams } from "react-router-dom";
import "../styles/List.scss";
import "../styles/ListEnhanced.css";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings) || [];

  const getSearchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/properties/search/${search}`
      );

      if (!response.ok) throw new Error("Failed to fetch listings");

      const data = await response.json();
      console.log("API data:", data);

      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) getSearchListings();
  }, [search]);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <h1 className="title-list">{search} Listings</h1>

      <div className="list">
        {Array.isArray(listings) && listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listingId={listing._id}
              creator={listing.creator}
              listingPhotoPaths={listing.listingPhotoPaths}
              city={listing.city}
              province={listing.province}
              country={listing.country}
              category={listing.category}
              type={listing.type}
              price={listing.price}
            />
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SearchPage;