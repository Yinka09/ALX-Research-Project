import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-transparent">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-3 px-5 md:px-10">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-violet-100">Realty</span>
            <span className="text-black">Hub</span>
          </h1>
        </Link>
        <form
          onSubmit={handelSubmit}
          className="hidden lg:flex bg-slate-100 p-2 rounded-lg  item-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 bg-black"></span>
              <span className="block h-0.5 w-8 bg-black"></span>
              <span className="block h-0.5 w-8 bg-black"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              {" "}
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                <NavLink to="/" onClick={() => setIsNavOpen(false)}>
                  <li className="border-b border-white my-4 uppercase ">
                    Home
                  </li>
                </NavLink>

                <NavLink to="/search" onClick={() => setIsNavOpen(false)}>
                  <li className=" border-b border-white my-4 uppercase">
                    Search
                  </li>
                </NavLink>

                <NavLink to="/about" onClick={() => setIsNavOpen(false)}>
                  <li className=" border-b border-white my-4 uppercase">
                    About
                  </li>
                </NavLink>
                <NavLink to="/profile" onClick={() => setIsNavOpen(false)}>
                  {currentUser ? (
                    <img
                      className="rounded-full h-14 w-14 object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  ) : (
                    <li className=" border-b border-white my-4 uppercase">
                      Sign In
                    </li>
                  )}
                </NavLink>
              </ul>
            </div>
          </section>
          <ul className="DESKTOP-MENU hidden lg:flex ">
            <NavLink to="/">
              <li className="sm:inline text-white hover:underline font-semibold pe-5 ">
                Home
              </li>
            </NavLink>
            <NavLink to="/about">
              <li className=" sm:inline text-white hover:underline font-semibold pe-5">
                About
              </li>
            </NavLink>
            <NavLink to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className=" sm:inline text-white hover:underline">
                  Sign In
                </li>
              )}
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
