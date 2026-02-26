import Navbar from "../components/Navbar.jsx"
import Slide from "../components/Slide.jsx"
import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <>
      <Navbar />
    
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </>
  )
}

export default HomePage
// import React from 'react'

// const HomePage = () => {
//   return (
//     <div>
//       hamara ghar nava wala
//     </div>
//   )
// }

// export default HomePage
