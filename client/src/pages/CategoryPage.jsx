import { useState, useEffect } from "react";
import "../styles/List.scss";
import "../styles/ListEnhanced.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings) || [];
  // const listings = useSelector((state) => state.listings.listings) || [];
  console.log("Redux listings:", listings);
  const getFeedListings = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3001/properties?category=${category}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }



      const data = await response.json();
      console.log("API data:", data);

      dispatch(setListings({ listings: data }));


      // const data = await response.json();
      // console.log("API data:", data);
      // dispatch(setListings(data));
    } catch (err) {
      console.log("Fetch Listings Failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      getFeedListings();
    }
  }, [category]);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <h1 className="title-list">{category} Listings</h1>

      <div className="list">
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
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
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;