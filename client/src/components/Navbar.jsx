import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import "../styles/NavbarEnhanced.css";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assets/logo.png" alt="logo" />
      </Link>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          disabled={search === ""}
          onClick={() => navigate(`/properties/search/${search}`)}
        >
          <Search sx={{ color: "var(--pinkred)" }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        <Link to={user ? "/create-listing" : "/login"} className="host">
          Become A Host
        </Link>

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "var(--darkgrey)" }} />

          {!user ? (
            <Person sx={{ color: "var(--darkgrey)" }} />
          ) : user.profileImagePath ? (
            <img
              src={user.profileImagePath}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <Person sx={{ color: "var(--darkgrey)" }} />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
