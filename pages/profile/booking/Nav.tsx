import Link from "next/link";
import { useRouter } from "next/router";

import { routes } from "../../../helpers/config/constants";

const Nav = () => {
  const router = useRouter();

  const upcomingClasses =
    router.pathname == routes.upcomingBooking
      ? "border-neutral-900 text-white group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
      : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium";

  const pastClasses =
    router.pathname == routes.pastBooking
      ? "border-neutral-900 text-white group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
      : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium";

  return (
    <nav className="-mb-px flex space-x-2 rtl:space-x-reverse sm:rtl:space-x-reverse" aria-label="Tabs">
      <Link href={routes.upcomingBooking}>
        <a className={upcomingClasses}>
          <span>Upcoming</span>
        </a>
      </Link>

      <Link href={routes.pastBooking}>
        <a className={pastClasses}>
          <span>Past</span>
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
