import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useState, useEffect } from "react";

import { routes } from "../../../../helpers/config/constants";
import Bookings from "../Bookings";
import LoadingScreen from "../LoadingScreen";
import Nav from "../Nav";
import NoBookingFound from "../NoBookingFound";
import Sidebar from "../Sidebar";

interface Props {
  upcomingBookings: [];
}

/**
 * @description Get the all upcoming bookings
 * @return props: object
 */
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const upcomingBookings = await fetch(`http://localhost:3330${routes.getUpcomingBookings}`);
  // const bookings = await upcomingBookings.json();

  const upcomingBookings = await axios.get(`${process.env.NEXTAUTH_URL}/${routes.getUpcomingBookings}`, {
    withCredentials: true,
    headers: {
      Cookie: String(req.headers.cookie),
    },
  });

  const bookings = upcomingBookings.data;

  return {
    props: { upcomingBookings: bookings },
  };
};

const Upcoming: NextPage<Props> = ({ upcomingBookings }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  return (
    <Sidebar>
      <div className="py-8">
        <div className="block min-h-[80px] justify-between px-4 sm:flex sm:px-6 md:px-8">
          <div className="mb-8 w-full">
            <h1 className=" mb-1 text-xl font-bold capitalize tracking-wide text-gray-300">Bookings</h1>
            <p className="min-h-10 text-sm text-neutral-400 ltr:mr-4 rtl:ml-4">
              See upcoming and past events booked through your event type links.
            </p>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-8">
          <Nav />
          <hr />
          <main>
            <div className="-mx-4 flex flex-col sm:mx-auto">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  {!loading ? (
                    upcomingBookings.length > 0 ? (
                      <Bookings bookings={upcomingBookings} />
                    ) : (
                      <NoBookingFound />
                    )
                  ) : (
                    <LoadingScreen />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
        <nav className="bottom-nav fixed bottom-0 z-30 flex w-full backgroundSlateCustom shadow md:hidden">
          <a
            className="text-neutral-400 hover:text-gray-700 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden backgroundSlateCustom py-2 px-2 text-center text-xs font-medium hover:bg-gray-50 focus:z-10 sm:text-sm"
            href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="text-gray-400 group-hover:text-gray-500 mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center">
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"></path>
            </svg>
            <span className="truncate">Event Types</span>
          </a>
          <a
            className="text-gray-900 group relative min-w-0 flex-1 overflow-hidden backgroundSlateCustom py-2 px-2 text-center text-xs font-medium hover:bg-gray-50 focus:z-10 sm:text-sm"
            aria-current="page"
            href={routes.upcomingBooking}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="text-gray-900 mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"></path>
            </svg>
            <span className="truncate">Bookings</span>
          </a>
          <a
            className="text-neutral-400 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden backgroundSlateCustom py-2 px-2 text-center text-xs font-medium hover:bg-gray-50 focus:z-10 sm:text-sm"
            href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="text-gray-400 group-hover:text-gray-500 mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"></path>
            </svg>
            <span className="truncate">Availability</span>
          </a>
          <a
            className="text-neutral-400 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden backgroundSlateCustom py-2 px-2 text-center text-xs font-medium hover:bg-gray-50 focus:z-10 sm:text-sm"
            href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="text-gray-400 group-hover:text-gray-500 mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span className="truncate">Apps</span>
          </a>
        </nav>
        <div className="block pt-12 md:hidden"></div>
      </div>
    </Sidebar>
  );
};

export default Upcoming;
