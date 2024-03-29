import { Link } from "react-router-dom";
import bgImage0 from "../assets/images/bg-image0.jpg";
import bgImage1 from "../assets/images/bg-image1.jpg";
import bgImage2 from "../assets/images/bg-image2.jpg";
import bgImage3 from "../assets/images/bg-image3.jpg";
import bgImage4 from "../assets/images/bg-image4.jpg";
import bgImage6 from "../assets/images/bg-image6.jpg";
import bgImage7 from "../assets/images/bg-image7.jpg";
import bgImage8 from "../assets/images/bg-image8.jpg";

// Functional component for Promo section
export default function Promo() {
  // Render component
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-0 sm:pb-40  md:pb-40 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="md:t-0 sm:px-0 sm:max-w-lg">
            <h1 className=" text-center sm:text-left text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl myFont">
              Your Dream Space Awaits
            </h1>
            <p className="text-justify mx-2 sm:mx-0 sm:text-left mt-4 text-base  leading-7 text-gray-600">
              Unleashing the Power of Seamless Real Estate Transactions.Explore
              RealtyHub for Exclusive Property Experiences!
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 reveal">
                        <img
                          src={bgImage2}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg reveal">
                        <img
                          src={bgImage4}
                          alt=""
                          className="h-full w-full object-cover object-center hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg reveal">
                        <img
                          src={bgImage1}
                          alt=""
                          className="h-full w-full object-cover object-center hover:scale-105"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg reveal">
                        <img
                          src={bgImage8}
                          alt=""
                          className="h-full w-full object-cover object-center hover:scale-105"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg reveal">
                        <img
                          src={bgImage7}
                          alt=""
                          className="h-full w-full object-cover object-center hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg reveal">
                        <img
                          src={bgImage6}
                          alt=""
                          className="h-full w-full object-cover object-center hover:scale-105"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg reveal">
                        <img
                          src={bgImage3}
                          alt=""
                          className="h-full w-full object-cover object-center hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/search"
                href="#"
                className="mx-2 sm:mx-0 inline-block rounded-md border border-transparent bg-yellow-900 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
