import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  useEffect(() => {
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 140;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);

    // Don't forget to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className=" reveal mb-7 bg-white bg-opacity-98 shadow-md hover:shadow-lg transition-shadow overflow-hidden myborder w-full sm:w-[280px] md:w-[260px] lg:w-[200px] xl:w-[390px] mx-auto">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="Listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 mt-5">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1 w-full">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            ${" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
