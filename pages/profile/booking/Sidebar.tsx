import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

import Shell from "@components/Shell";

import { routes } from "../../../helpers/config/constants";
import avatar from "../../../public/blank.png";

const Sidebar = (props: { children: ReactNode }) => {
  const { data: session } = useSession();
  const signOutHandler = () => {
    // window.location.href = "/api/auth/logout";
    window.location.href = "/api/auth/signout";
    // /api/auth/signout
  };
  return (
    <Shell>
      <div className="flex h-screen overflow-hidden backgroundSlateCustom" data-testid="dashboard-shell">
        <div className="hidden md:flex lg:flex-shrink-0">
          <div className="flex w-14 flex-col lg:w-56">
            <div className="flex h-0 flex-1 flex-col border-r border-neutral-700 bg-[#292929]">
              <div className="flex flex-1 flex-col overflow-y-auto pt-3 pb-4 lg:pt-5">
                <a className="px-4 md:hidden lg:inline" href="#">
                  <h1 className="inline">
                    <strong>
                      <h2 className="mt-1 text-center text-1xl text-neutral-200">Cal.com(Clone)</h2>
                    </strong>
                  </h1>
                </a>
                <a className="md:inline lg:hidden" href="#">
                  <h1 className="inline">
                    <strong>
                      <h2 className="mt-1 text-center text-1xl text-neutral-200">Cal.com(Clone)</h2>
                    </strong>
                  </h1>
                </a>
                <nav className="mt-2 flex-1 space-y-1 bg-[#292929] px-2 lg:mt-5">
                  <a
                    className="text-neutral-500 hover:bg-gray-50 hover:text-neutral-900 group flex items-center rounded-sm px-2 py-2 text-sm font-medium"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-neutral-400 group-hover:text-neutral-500 h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3">
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-3 hidden lg:inline">Event Types</span>
                  </a>
                  <Link href={routes.upcomingBooking}>
                    <a
                      className="bg-neutral-100 text-neutral-900 group flex items-center rounded-sm px-2 py-2 text-sm font-medium"
                      href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="text-neutral-500 h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"></path>
                      </svg>
                      <span className="ml-3 hidden lg:inline">Bookings</span>
                    </a>
                  </Link>

                  <a
                    className="text-neutral-500 hover:bg-gray-50 hover:text-neutral-900 group flex items-center rounded-sm px-2 py-2 text-sm font-medium"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-neutral-400 group-hover:text-neutral-500 h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-3 hidden lg:inline">Availability</span>
                  </a>
                  <a
                    className="text-neutral-500 hover:bg-gray-50 hover:text-neutral-900 group flex items-center rounded-sm px-2 py-2 text-sm font-medium"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-neutral-400 group-hover:text-neutral-500 h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span className="ml-3 hidden lg:inline">Apps</span>
                  </a>
                  <a
                    className="text-neutral-500 hover:bg-gray-50 hover:text-neutral-900 group flex items-center rounded-sm px-2 py-2 text-sm font-medium"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-neutral-400 group-hover:text-neutral-500 h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3">
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-3 hidden lg:inline">Settings</span>
                  </a>
                </nav>
              </div>
              <div role="separator" aria-orientation="horizontal" className="h-px bg-neutral-700"></div>
              <div role="menuitem" className="text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ">
                <a
                  className="flex cursor-pointer px-4 py-2 text-sm text-neutral-500 hover:bg-gray-100 hover:text-gray-900"
                  onClick={signOutHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-gray-500 group-hover:text-gray-700 h-5 w-5 flex-shrink-0 mr-3 rtl:ml-3">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"></path>
                  </svg>
                  Sign out
                </a>
              </div>
              <div role="separator" aria-orientation="horizontal" className="h-px bg-neutral-700"></div>

              <div
                className="rounded-sm pb-2 pl-3 pt-2 pr-2 hover:bg-gray-100 lg:mx-2 lg:pl-2"
                data-testid="user-dropdown-trigger">
                <span className="hidden lg:inline">
                  <button
                    className="group flex w-full cursor-pointer appearance-none items-center text-left"
                    type="button"
                    id="radix-17"
                    aria-haspopup="menu"
                    data-state="closed">
                    <span className="h-10 w-10 relative flex-shrink-0 rounded-full bg-gray-300  ltr:mr-3 rtl:ml-3">
                      <img className="rounded-full" src={avatar.src} alt="xand3rx" />
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                    </span>
                    <span className="flex flex-grow items-center truncate">
                      <span className="flex-grow truncate text-sm px-2">
                        <span className="block truncate font-medium text-neutral-300 hover:text-gray-900">
                          {session?.user?.name}
                        </span>
                        <span className="block truncate font-medium text-neutral-300 hover:text-gray-900">
                          {session?.user?.email}
                        </span>
                      </span>
                    </span>
                  </button>
                </span>
                <span className="hidden md:inline lg:hidden">
                  <button
                    className="group flex w-full cursor-pointer appearance-none items-center text-left"
                    type="button"
                    id="radix-18"
                    aria-haspopup="menu"
                    data-state="closed">
                    <span className="h-8 w-8 relative flex-shrink-0 rounded-full bg-gray-300  ltr:mr-3 rtl:ml-3">
                      <img className="rounded-full" src={avatar.src} alt="xand3rx" />
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                    </span>
                  </button>
                </span>
              </div>
              <small className="mx-3 mt-1 mb-2 hidden opacity-50 lg:block text-xs">
                © {new Date().getFullYear()} Cal.com(Clone)
              </small>
            </div>
          </div>
        </div>
        <div className="flex w-0 flex-1 flex-col overflow-hidden">
          <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none max-w-[1700px]">
            <nav className="flex items-center justify-between border-b border-gray-200 backgroundSlateCustom p-4 md:hidden">
              <a href="/event-types">
                <h1 className="inline">
                  <strong>
                    {/* <img className="h-5 w-auto" alt="Cal" title="Cal" src="/calendso-logo-white-word.svg" /> */}
                  </strong>
                </h1>
              </a>
              <div className="flex items-center gap-3 self-center">
                <button className="rounded-full backgroundSlateCustom p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                  <span className="sr-only">View notifications</span>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-6">
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"></path>
                    </svg>
                  </a>
                </button>
                <button
                  className="group flex w-full cursor-pointer appearance-none items-center text-left"
                  type="button"
                  id="radix-19"
                  aria-haspopup="menu"
                  data-state="closed">
                  <span className="h-8 w-8 relative flex-shrink-0 rounded-full bg-gray-300  ltr:mr-3 rtl:ml-3">
                    <img className="rounded-full" src={avatar.src} alt="xand3rx" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                  </span>
                </button>
              </div>
            </nav>
            {props.children}
          </main>
        </div>
      </div>
    </Shell>
  );
};

export default Sidebar;
