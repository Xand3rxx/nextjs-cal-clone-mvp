import { useRouter } from "next/router";

import { routes } from "../../../helpers/config/constants";

const NoBookingFound = () => {
  const router = useRouter();

  const name = router.pathname == routes.upcomingBooking ? "Upcoming" : "Past";

  return (
    <div className="min-h-80 my-6 flex flex-col items-center justify-center rounded-sm">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="inline-block h-10 w-10 ">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div className="max-w-[420px] text-center">
        <h2 className="mt-6 mb-1 text-lg font-medium">No {name} bookings, yet</h2>
        <p className="text-sm leading-6 text-gray-400">
          You have no {name} bookings. As soon as someone books a time with you it will show up here.
        </p>
      </div>
    </div>
  );
};

export default NoBookingFound;
