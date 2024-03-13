import React, { useState, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "20 million" },
  { id: 2, name: "Assets under holding", value: "$200 trillion" },
  { id: 3, name: "New users annually", value: "46,000" },
];

export default function Example() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: false });
  const startAnimationRef = useRef(null);

  if (inView && !isVisible) {
    setIsVisible(true);
  }

  return (
    <div className="bg-white py-24  lg:py-20">
      <h1 className="text-center px-8 sm:px-0 pb-10 font-semibold text-gray-900 text-4xl sm:text-6xl myFont">
        Trusted by realtors worldwide
      </h1>

      <div ref={ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={startAnimationRef}>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 p-20 rounded-lg bg-stone-100">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">
                Transactions every 24 hours
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight  text-gray-900 sm:text-5xl">
                {inView && (
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={20}
                    duration={8}
                    startOnMount={false}
                    useEasing={true}
                    useGrouping={true}
                    separator=" "
                    suffix=" million"
                  />
                )}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">
                Assets under holding
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight  text-gray-900 sm:text-5xl">
                {inView && (
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={200}
                    duration={5}
                    startOnMount={false}
                    useEasing={true}
                    useGrouping={true}
                    prefix="$"
                    suffix=" trillion"
                  />
                )}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">
                New users annually
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight  text-gray-900 sm:text-5xl">
                {inView && (
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={46}
                    duration={4}
                    startOnMount={false}
                    useEasing={true}
                    useGrouping={true}
                    decimals={4}
                    decimal=","
                  />
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
