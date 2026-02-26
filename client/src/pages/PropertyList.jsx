import "../styles/List.scss";
import "../styles/ListEnhanced.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];

  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();

      dispatch(setPropertyList(data));
    } catch (err) {
      console.log("Fetch all properties failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getPropertyList();
    }
  }, [user]);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>

      <div className="list">
        {propertyList.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          propertyList.map((property) => (
            <ListingCard
              key={property._id}
              listingId={property._id}
              creator={property.creator}
              listingPhotoPaths={property.listingPhotoPaths}
              city={property.city}
              province={property.province}
              country={property.country}
              category={property.category}
              type={property.type}
              price={property.price}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;