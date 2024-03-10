import {
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "User Registration",
    description:
      "Experience the seamless process of signing up to unlock exclusive features tailored just for you. Whether you're a property owner or a prospective buyer, creating an account is your gateway to a personalized real estate journey. ",
    icon: FingerPrintIcon,
  },
  {
    name: "Property Upload",
    description:
      "Embark on the journey of showcasing your properties effortlessly. Our platform allows you to upload property details with ease, providing potential buyers with comprehensive insights into what you have to offer.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Property Search",
    description:
      "Discover your dream property through a simple and intuitive search experience. Search for properties that match your criteria, explore various options, and find the perfect space to call your own. Your real estate journey starts with a search tailored to your needs.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Buyer Contact",
    description:
      "Forge connections and engage with potential buyers effortlessly. Our platform simplifies communication through straightforward queues, providing a direct line of contact between sellers and buyers. Connect, communicate, and make informed decisions in your real estate transactions.",
    icon: ChatBubbleLeftIcon,
  },
];

export default function Center() {
  return (
    <div className="bg-white py-20 sm:py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl myFont">
            Unlock the RealtyHub Experience
          </p>
        </div>
        <div className="mx-2 mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-28 gap-y-10 md:max-w-none lg:grid-cols-2 md:gap-y-10 text-justify">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16 ">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-950">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
