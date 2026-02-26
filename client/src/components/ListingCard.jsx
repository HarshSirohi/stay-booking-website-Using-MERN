// import { useState } from "react";
// import "../styles/ListingCard.scss";
// import {
//   ArrowForwardIos,
//   ArrowBackIosNew,
//   Favorite,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setWishList } from "../redux/state";

// const ListingCard = ({
//   listingId,
//   creator,
//   listingPhotoPaths = [],
//   city,
//   province,
//   country,
//   category,
//   type,
//   price,
//   startDate,
//   endDate,
//   totalPrice,
//   booking,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevSlide = () => {
//     if (listingPhotoPaths.length > 0) {
//       setCurrentIndex(
//         (prevIndex) =>
//           (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
//       );
//     }
//   };

//   const goToNextSlide = () => {
//     if (listingPhotoPaths.length > 0) {
//       setCurrentIndex(
//         (prevIndex) => (prevIndex + 1) % listingPhotoPaths.length
//       );
//     }
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const wishList = user?.wishList || [];
//   const isLiked = wishList?.some((item) => item?._id === listingId);

//   const patchWishList = async () => {
//     if (user?._id !== creator._id) {
//       const response = await fetch(
//         `http://localhost:3001/users/${user?._id}/${listingId}`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const data = await response.json();
//       dispatch(setWishList(data.wishList));
//     }
//   };

//   const imgStyle = {
//     display: "block",
//     width: "100%",
//     height: "240px",
//     objectFit: "cover",
//     borderRadius: "12px",
//   };

//   const currentPhoto = listingPhotoPaths[currentIndex];

//   return (
//     <div
//       className="listing-card"
//       onClick={() => navigate(`/properties/${listingId}`)}
//     >
//       <div className="slider-container">
//         {currentPhoto ? (
//           // <div className="slide">
//           //   <div
//           //     style={{
//           //       ...imgStyle,
//           //       backgroundImage: `url(${currentPhoto})`,
//           //       backgroundSize: "cover",
//           //       backgroundPosition: "center",
//           //       backgroundColor: "#f0f0f0"
//           //     }}
//           //     role="img"
//           //     aria-label={`photo ${currentIndex + 1}`}
//           //   />
//                   <div className="slide">
//           <img
//             src={currentPhoto}
//             alt={`photo ${currentIndex + 1}`}
//           />
//             {listingPhotoPaths.length > 1 && (
//               <>
//                 <div
//                   className="prev-button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToPrevSlide();
//                   }}
//                 >
//                   <ArrowBackIosNew sx={{ fontSize: "15px" }} />
//                 </div>
//                 <div
//                   className="next-button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToNextSlide();
//                   }}
//                 >
//                   <ArrowForwardIos sx={{ fontSize: "15px" }} />
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="slide">
//             <div
//               style={{
//                 ...imgStyle,
//                 backgroundImage: `url("/placeholder.jpg")`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//               role="img"
//               aria-label="No image available"
//             />
//           </div>
//         )}
//       </div>

//       <h3>
//         {city}, {province}, {country}
//       </h3>
//       <p>{category}</p>

//       {!booking ? (
//         <>
//           <p>{type}</p>
//           <p>
//             <span>${price}</span> per night
//           </p>
//         </>
//       ) : (
//         <>
//           <p>
//             {startDate} - {endDate}
//           </p>
//           <p>
//             <span>${totalPrice}</span> total
//           </p>
//         </>
//       )}

//       <button
//         className="favorite"
//         onClick={(e) => {
//           e.stopPropagation();
//           patchWishList();
//         }}
//         disabled={!user}
//       >
//         {isLiked ? (
//           <Favorite sx={{ color: "red" }} />
//         ) : (
//           <Favorite sx={{ color: "white" }} />
//         )}
//       </button>
//     </div>
//   );
// };

// export default ListingCard;




// // import { useState } from "react";
// // import "../styles/ListingCard.scss";
// // import {
// //   ArrowForwardIos,
// //   ArrowBackIosNew,
// //   Favorite,
// // } from "@mui/icons-material";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { setWishList } from "../redux/state";

// // const ListingCard = ({
// //   listingId,
// //   creator,
// //   listingPhotoPaths = [],
// //   city,
// //   province,
// //   country,
// //   category,
// //   type,
// //   price,
// //   startDate,
// //   endDate,
// //   totalPrice,
// //   booking,
// // }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const user = useSelector((state) => state.user);

// //   const wishList = user?.wishList || [];
// //   const isLiked = wishList.some((item) => item?._id === listingId);

// //   const goToPrevSlide = (e) => {
// //     e.stopPropagation();
// //     setCurrentIndex(
// //       (prevIndex) =>
// //         (prevIndex - 1 + listingPhotoPaths.length) %
// //         listingPhotoPaths.length
// //     );
// //   };

// //   const goToNextSlide = (e) => {
// //     e.stopPropagation();
// //     setCurrentIndex(
// //       (prevIndex) =>
// //         (prevIndex + 1) % listingPhotoPaths.length
// //     );
// //   };

// //   const patchWishList = async (e) => {
// //     e.stopPropagation();

// //     if (!user || user?._id === creator?._id) return;

// //     const response = await fetch(
// //       `http://localhost:3001/users/${user._id}/${listingId}`,
// //       {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //       }
// //     );

// //     const data = await response.json();
// //     dispatch(setWishList(data.wishList));
// //   };

// //   const currentPhoto =
// //     listingPhotoPaths.length > 0
// //       ? listingPhotoPaths[currentIndex]
// //       : "/placeholder.jpg";

// //   return (
// //     <div
// //       className="listing-card"
// //       onClick={() => navigate(`/properties/${listingId}`)}
// //     >
// //       <div className="slider-container">
// //         <div className="slide">
// //           <img src={currentPhoto} alt="listing" />

// //           {listingPhotoPaths.length > 1 && (
// //             <>
// //               <button
// //                 className="prev-button"
// //                 onClick={goToPrevSlide}
// //               >
// //                 <ArrowBackIosNew sx={{ fontSize: "14px" }} />
// //               </button>

// //               <button
// //                 className="next-button"
// //                 onClick={goToNextSlide}
// //               >
// //                 <ArrowForwardIos sx={{ fontSize: "14px" }} />
// //               </button>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       <h3>
// //         {city}, {province}, {country}
// //       </h3>

// //       <p>{category}</p>

// //       {!booking ? (
// //         <>
// //           <p>{type}</p>
// //           <p>
// //             <span>${price}</span> per night
// //           </p>
// //         </>
// //       ) : (
// //         <>
// //           <p>
// //             {startDate} - {endDate}
// //           </p>
// //           <p>
// //             <span>${totalPrice}</span> total
// //           </p>
// //         </>
// //       )}

// //       <button
// //         className="favorite"
// //         onClick={patchWishList}
// //         disabled={!user}
// //       >
// //         <Favorite
// //           sx={{ color: isLiked ? "red" : "white" }}
// //         />
// //       </button>
// //     </div>
// //   );
// // };

// // export default ListingCard;



// this one was using 

// import { useState } from "react";
// import "../styles/ListingCard.scss";
// import {
//   ArrowForwardIos,
//   ArrowBackIosNew,
//   Favorite,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setWishList } from "../redux/state";

// const ListingCard = ({
//   listingId,
//   creator,
//   listingPhotoPaths = [],
//   city,
//   province,
//   country,
//   category,
//   type,
//   price,
//   startDate,
//   endDate,
//   totalPrice,
//   booking,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevSlide = () => {
//     if (listingPhotoPaths.length > 0) {
//       setCurrentIndex(
//         (prevIndex) =>
//           (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
//       );
//     }
//   };

//   const goToNextSlide = () => {
//     if (listingPhotoPaths.length > 0) {
//       setCurrentIndex(
//         (prevIndex) => (prevIndex + 1) % listingPhotoPaths.length
//       );
//     }
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const wishList = user?.wishList || [];
//   const isLiked = wishList?.some((item) => item?._id === listingId);

//   const patchWishList = async () => {
//     if (user?._id !== creator._id) {
//       const response = await fetch(
//         `http://localhost:3001/users/${user?._id}/${listingId}`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const data = await response.json();
//       dispatch(setWishList(data.wishList));
//     }
//   };

//   // ✅ safer currentPhoto
//   const currentPhoto =
//     listingPhotoPaths.length > 0
//       ? listingPhotoPaths[currentIndex]
//       : "/placeholder.jpg";

//   return (
//     <div
//       className="listing-card"
//       onClick={() => navigate(`/properties/${listingId}`)}
//     >
//       {/* ✅ updated slider structure */}
//       <div className="slider-container">
//   <div className="slide">
//     <img
//       src={currentPhoto}
//       alt={`photo ${currentIndex + 1}`}
//     />

//     {listingPhotoPaths.length > 1 && (
//       <>
//         <button
//           className="prev-button"
//           onClick={(e) => {
//             e.stopPropagation();
//             goToPrevSlide();
//           }}
//         >
//           <ArrowBackIosNew sx={{ fontSize: "15px" }} />
//         </button>

//         <button
//           className="next-button"
//           onClick={(e) => {
//             e.stopPropagation();
//             goToNextSlide();
//           }}
//         >
//           <ArrowForwardIos sx={{ fontSize: "15px" }} />
//         </button>
//       </>
//     )}
//   </div>
// </div>

//       <h3>
//         {city}, {province}, {country}
//       </h3>
//       <p>{category}</p>

//       {!booking ? (
//         <>
//           <p>{type}</p>
//           <p>
//             <span>${price}</span> per night
//           </p>
//         </>
//       ) : (
//         <>
//           <p>
//             {startDate} - {endDate}
//           </p>
//           <p>
//             <span>${totalPrice}</span> total
//           </p>
//         </>
//       )}

//       <button
//         className="favorite"
//         onClick={(e) => {
//           e.stopPropagation();
//           patchWishList();
//         }}
//         disabled={!user}
//       >
//         {isLiked ? (
//           <Favorite sx={{ color: "red" }} />
//         ) : (
//           <Favorite sx={{ color: "white" }} />
//         )}
//       </button>
//     </div>
//   );
// };

// export default ListingCard;







import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths = [],
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const wishList = user?.wishList || [];

  // ✅ because now wishlist stores only listingId
  // const isLiked = wishList.includes(listingId);

  // const wishList = user?.wishList || [];

//   const isLiked = wishList.some(
//   (item) => item.toString() === listingId.toString()
// );

const isLiked = wishList.some(
  (item) => item._id === listingId
);


// console.log("wishlist:", wishList);
// console.log("listingId:", listingId);

  /* ---------------- SLIDER ---------------- */

  const goToPrevSlide = (e) => {
    e.stopPropagation();
    if (listingPhotoPaths.length > 0) {
      setCurrentIndex(
        (prev) =>
          (prev - 1 + listingPhotoPaths.length) %
          listingPhotoPaths.length
      );
    }
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    if (listingPhotoPaths.length > 0) {
      setCurrentIndex(
        (prev) => (prev + 1) % listingPhotoPaths.length
      );
    }
  };

  const currentPhoto =
    listingPhotoPaths.length > 0
      ? listingPhotoPaths[currentIndex]
      : "/placeholder.jpg";

  /* ---------------- WISHLIST ---------------- */

  // const patchWishList = async (e) => {
  //   e.stopPropagation();

  //   if (!userId) {
  //     alert("Please login first!");
  //     return;
  //   }

  //   // Optional: prevent liking your own property
  //   if (creator?._id === userId) return;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/users/${userId}/${listingId}`,
  //       {
  //         method: "PATCH",
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("Updated wishlist from backend:", data.wishList);

  //     if (response.ok) {
  //       dispatch(setWishList(data.wishList));
  //     }
  //   } catch (err) {
  //     console.log("Wishlist update failed", err.message);
  //   }
  // };

const patchWishList = async (e) => {
  e.stopPropagation();
  console.log("patchWishList STARTED");

  if (!userId) {
    console.log("No userId");
    alert("Please login first!");
    return;
  }

  console.log("Sending request with:");
  console.log("userId:", userId);
  console.log("listingId:", listingId);

  try {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/${listingId}`,
      {
        method: "PATCH",
      }
    );

    console.log("Response received");

    const data = await response.json();
    console.log("Backend returned:", data);

    if (response.ok) {
      dispatch(setWishList(data.wishList));
      console.log("Redux updated");
    }
  } catch (err) {
    console.log("ERROR:", err);
  }
};
  return (
    <div
      className="listing-card"
      onClick={() => navigate(`/properties/${listingId}`)}
    >
      {/* -------- IMAGE SLIDER -------- */}
      <div className="slider-container">
        <div className="slide">
          <img src={currentPhoto} alt="listing" />

          {listingPhotoPaths.length > 1 && (
            <>
              <button
                className="prev-button"
                onClick={goToPrevSlide}
              >
                <ArrowBackIosNew sx={{ fontSize: "14px" }} />
              </button>

              <button
                className="next-button"
                onClick={goToNextSlide}
              >
                <ArrowForwardIos sx={{ fontSize: "14px" }} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* -------- DETAILS -------- */}
      <h3>
        {city}, {province}, {country}
      </h3>

      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>${totalPrice}</span> total
          </p>
        </>
      )}

        
     

      {/* //* -------- FAVORITE BUTTON -------- */}
      {!booking && (
        <button
          className="favorite"
          onClick={patchWishList}
        >
          <Favorite
            sx={{ color: isLiked ? "red" : "white" }}
          />
        </button>
      )}
    </div>
    


  );
};

export default ListingCard;