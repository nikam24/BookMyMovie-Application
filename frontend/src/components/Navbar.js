import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setShowMenu(false); // Close menu on resize
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleProfileClick = () => {
    setShowMenu(false); // Close menu on profile click
    navigate("/profile");
  };

  const handleLogout = () => {
    setShowMenu(false); // Close menu on logout
    props.Logout();
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-pink-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-white"
        >
          MovieBooking
        </Link>

        <div className="hidden md:flex gap-4">
          <Link
            to="/movies"
            className="text-white hover:text-pink-300 transition"
          >
            Movies
          </Link>
          <Link
            to="/theaters"
            className="text-white hover:text-pink-300 transition"
          >
            Theaters
          </Link>
          <Link
            to="/offers"
            className="text-white hover:text-pink-300 transition"
          >
            Offers
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            <img
              className="w-6 h-6 hover:bg-pink-300"
              src=".././hamburger_icon.png"
              alt="Hamburger Icon"
            />
          </div>

          {showMenu && (
            <div className="absolute top-16 bg-white w-48 p-2 rounded-md shadow-md z-10">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/movies"
                    className="text-gray-800 hover:text-pink-500 transition"
                    onClick={toggleMenu}
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/theaters"
                    className="text-gray-800 hover:text-pink-500 transition"
                    onClick={toggleMenu}
                  >
                    Theaters
                  </Link>
                </li>
                <li>
                  <Link
                    to="/offers"
                    className="text-gray-800 hover:text-pink-500 transition"
                    onClick={toggleMenu}
                  >
                    Offers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin"
                    className="text-gray-800 hover:text-pink-500 transition"
                    onClick={toggleMenu}
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <input
            type="search"
            placeholder="Search for movies, theaters, offers"
            className="search-bar p-1 rounded-md focus:outline-none"
          />

          <img
            className="h-8 w-8 border rounded-full bg-transparent cursor-pointer"
            src="http://localhost:3000/profile_icon.png"
            alt="Profile Icon"
            onClick={handleProfileClick}
          />
          <button
            className="bg-red-700 p-2 rounded-lg font-semibold text-white hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
