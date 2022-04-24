import { useSession } from "next-auth/react";
import Link from "next/link";

import { routes } from "../helpers/config/constants";
import SectionImage from "../public/avoid-meeting-overload.svg";
import WhiteLogo from "../public/logo-white.svg";

const Index = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-20 border border-t-0 border-l-0 border-r-0 border-gray-700 bg-black">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start px-8 lg:w-0 lg:flex-1 -ml-1">
              <a href="/">
                <div>
                  <span className="brand-logo font-cal inline font-bold">
                    <span className="sr-only">Cal.com(Clone)</span>
                    <img className="h-5 w-auto inline" src={WhiteLogo.src} alt="Cal.com logo" />
                    (Clone)
                  </span>
                </div>
              </a>
            </div>
            <div className="-my-2 mr-2 md:hidden">
              <button
                className="inline-flex items-center justify-center bg-black px-2 py-2 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent"
                id="headlessui-popover-button-5"
                type="button"
                aria-expanded="false">
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <nav className="hidden space-x-4 md:flex">
                <Link href={session ? routes.upcomingBooking : routes.login}>
                  <a className="px-7 py-2 text-base text-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 hover:text-white ">
                    {session ? "Dashboard" : "Login"}
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className=" -mt-1.5 mx-auto block max-w-7xl py-10 lg:flex">
          <div className="w-full px-7 lg:w-1/2">
            <h3 className="font-cal mt-[185px] mb-4 text-3xl font-medium text-gray-300">
              Avoid meeting overload
            </h3>
            <p className="text-gray-400">
              Limit people from booking too many meetings per day or week or too close together. Set minimum
              notice periods so you don’t get any surprise meetings.
            </p>
            <hr className="my-10 w-24 border-neutral-700" />
            <div className="font-cal space-y-2 font-medium">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="mr-1 -mt-1 inline h-7 w-7 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>{" "}
                Set buffers before &amp; after events
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="mr-1 -mt-1 inline h-7 w-7 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>{" "}
                Set minimum notice periods
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="mr-1 -mt-1 inline h-7 w-7 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>{" "}
                Set limits on how often you can get booked
              </div>
            </div>
            {!session && (
              <Link href={routes.createMeetingPage}>
                <a className="mt-8 inline-block bg-neutral-900 px-4 py-3 font-medium text-white sm:text-sm">
                  Get Started
                </a>
              </Link>
            )}
          </div>
          <div className="relative mt-[66px] w-full max-w-[612px] px-7 sm:px-0 lg:w-1/2">
            <img className="-mr-16 w-full lg:w-auto" src={SectionImage.src} alt="Avoid Meeting Overload" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
