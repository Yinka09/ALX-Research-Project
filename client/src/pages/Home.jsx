import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import Example from "../components/Example";
import Promo from "../components/Promo";
import Center from "../components/Center";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

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
    <div>
      {/* top */}
      <div className=" flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-white font-bold text-3xl lg:text-7xl md:ps-4 myFont">
          Find your next <span className="">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-zinc-200 text-xs sm:text-sm md:ps-4 myFont">
          RealtyHub is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-400 font-bold hover:underline md:ps-4 myFont"
        >
          Let's get started...
        </Link>
      </div>
      {/* swiper */}
      <div className="bg-white reveal">
        <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={listing._id}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div>
          <Center />
        </div>
        <div>
          <Promo />
        </div>
        <div>
          <Example />
        </div>
        {/* listing results for offer, sale and rent */}
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 ">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3 myFont">
                <h2 className="text-2xl font-semibold text-black md:ps-7">
                  Recent Offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline md:ps-7"
                  to={"/search?offer=true"}
                >
                  Show more offers...
                </Link>
              </div>
              <div className="flex flex-wrap xl:flex-nowrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3 myFont">
                <h2 className="text-2xl font-semibold text-black md:ps-7">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline md:ps-7"
                  to={"/search?type=rent"}
                >
                  Show more places for rent...
                </Link>
              </div>
              <div className="flex flex-wrap xl:flex-nowrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3 myFont">
                <h2 className="text-2xl font-semibold text-black md:ps-7">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline md:ps-7"
                  to={"/search?type=sale"}
                >
                  Show more places for sale...
                </Link>
              </div>
              <div className="flex flex-wrap xl:flex-nowrap gap-4 mb-28">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
