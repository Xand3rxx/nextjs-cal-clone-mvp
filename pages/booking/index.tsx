import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { FaInfoCircle, FaClock, FaLink, FaLocationArrow, FaRegCalendarAlt } from "react-icons/fa";

import { routes } from "../../helpers/config/constants";

// Type cast props
export type EventProps = {
  id: number;
  title: string;
  url: string;
  duration: number;
  description: string;
  location: string;
  meetingLink: string;
  availability: string;
};

export type IconProps = {
  name?: JSX.Element | JSX.Element[];
};

/**
 * @description Get the first EventType on the `EventType` table
 * @return props: object
 */
export const getServerSideProps: GetServerSideProps = async () => {
  const eventTypeRequest = await fetch(`http://localhost:3330/${routes.getDefaultEventType}`);
  const eventType = await eventTypeRequest.json();

  return {
    props: eventType,
  };
};

// Component for dynamic react icons
export const Icon = ({ name }: IconProps) => (
  <span className="mr-[10px] ml-[2px] -mt-0 inline-block h-3.5 w-3.5 text-gray-400">{name}</span>
);

const CreateBooking: React.FC<EventProps> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  //Declare contants
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [isBookinPage, setIsBookinPage] = useState(true);
  const [isBookingConfirmationPage, setIsBookingConfirmationPage] = useState(false);
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [displayCompany, setDisplayCompany] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  // Form constants
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  /**
   * @description set dispalay of elements to true
   * @param value: string
   * @return boolean true
   */
  const onChange = (value: any) => {
    setTimeout(() => {
      setCalendarValue(calendarValue);
    }, 2000);
    setDisplayCalendar(!displayCalendar);
    setIsBookinPage(!isBookinPage);
    setIsBookingConfirmationPage(!isBookingConfirmationPage);
    setStartDateTime(value);
    const dt = new Date(value);
    dt.setMinutes(dt.getMinutes() + props?.duration);
    setEndDateTime(dt);
  };

  /**
   * @description set dispalay of elements to false
   * @return boolean false
   */
  const cancelHandler = () => {
    setDisplayCalendar(!displayCalendar);
    setIsBookinPage(!isBookinPage);
    setIsBookingConfirmationPage(!isBookingConfirmationPage);
  };

  const companyHandler = () => {
    setDisplayCompany(!displayCompany);
  };

  const bookMeeting = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitLoader(true);
    try {
      // const router = useRouter();
      const body = { name, email, companyName, companyEmail, notes, startDateTime, endDateTime };
      const payload = await fetch(routes.bookMeeting, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await payload.json();

      if (response.length > 0) {
        setSubmitLoader(false);
      }

      router.push({
        pathname: routes.confirmationPage,
        query: { id: response.data.id },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="max-w-5xl mx-auto my-0 duration-500 ease-in-out transition-max-width md:my-24 mb-10">
      <div className="border border-dashed border-neutral-700 round-md max-height-10 backgroundSlateCustom">
        {!session ? (
          <div className="py-2 my-2 mx-2">
            <span className="mt-2">
              Note: Meetings that are scheduled without first creating an account will not be tracked. Proceed
              to create an account in order to keep track of your planned meetings.
            </span>{" "}
            <br />
            <Link href={routes.login}>
              <a className="mt-1 inline-block bg-neutral-900 px-4 py-3 font-medium text-white sm:text-sm">
                Sign In
              </a>
            </Link>
            <Link href={routes.register}>
              <a className="mt-1 ml-2 inline-block bg-neutral-900 px-4 py-3 font-medium text-white sm:text-sm">
                Create an account
              </a>
            </Link>
          </div>
        ) : (
          <div className="py-2 my-2 mx-2">
            <Link href={routes.upcomingBooking}>
              <a className="mt-1 ml-2 inline-block bg-neutral-900 px-4 py-3 font-medium text-white sm:text-sm">
                Back to dashboard
              </a>
            </Link>
          </div>
        )}
      </div>

      <main className="max-w-5xl min-h-full rounded-sm border-color-custom backgroundSlateCustom">
        <div className="px-4 sm:flex sm:p-4 sm:py-5 max-h-screen">
          <div className="px-4 pr-8 sm:flex sm:p-4 sm:py-5 sm:border-r sm:dark:border-gray-700 md:flex md:flex-col sm:w-1/3">
            <ul className=""></ul>
            <h2 className="mt-3 font-medium text-gray-300">{session?.user?.name}</h2>
            <h1 className="mb-4 text-xl font-semibold text-white">{props?.title}</h1>
            <p className="mb-2 text-white">
              <Icon name={<FaInfoCircle />} />
              {props?.description}
            </p>
            <p className="mb-2 text-white">
              <Icon name={<FaClock />} />
              {props?.duration} Minutes
            </p>
            <p className="mb-2 text-white">
              <Icon name={<FaLocationArrow />} />
              {props?.location}
            </p>
            <p className="mb-2 text-white">
              <Icon name={<FaLink />} />
              {props?.meetingLink}
            </p>

            {displayCalendar && (
              <p className="mb-2 text-emerald-500">
                <Icon name={<FaRegCalendarAlt />} />
                {startDateTime.toString()}
              </p>
            )}
          </div>
          <form onSubmit={bookMeeting} id="create-booking-form">
            {isBookinPage && (
              <div className="mt-8 sm:mt-0 sm:min-w-[455px] w-full sm:w-1/2 sm:pl-4 sm:pr-6 sm:dark:border-gray-700 md:w-1/3">
                <DateTimePicker
                  minDetail="month"
                  clearIcon=""
                  onChange={(value: any) => onChange(value)}
                  value={calendarValue}
                  isCalendarOpen={true}
                  minDate={calendarValue}
                  isClockOpen={false}
                  closeWidgets={false}
                  calendarClassName="rounded-sm react-datetime-picker__calendar react-calendar__tile react-calendar__month-view__weekdays react-calendar__tile--active react-datetime-picker__calendar--open text-white border border-gray-700 shadow-sm react-datetime-picker__inputGroup"
                />
              </div>
            )}
            {isBookingConfirmationPage && (
              <div className="mt-8 sm:mt-0 sm:min-w-[455px] w-full sm:w-1/2 sm:pl-4 sm:pr-6 text-white md:w-1/3">
                <input
                  type="hidden"
                  name="startDateTime"
                  className="hidden"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(startDateTime)}
                />
                <input
                  type="hidden"
                  name="endDateTime"
                  className="hidden"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(endDateTime)}
                />
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Recipient Name
                  </label>
                  <div className="mt-1">
                    <input
                      name="name"
                      type="text"
                      id="name"
                      required={true}
                      className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:ring-black selection:bg-green-500 sm:text-sm"
                      placeholder="John Doe"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Recipient Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      autoComplete="email"
                      autoCorrect="off"
                      inputMode="email"
                      id="email"
                      name="email"
                      required={true}
                      className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:border-neutral-800 focus:outline-none focus:ring-1 sm:text-sm focus:ring-black selection:bg-green-500"
                      placeholder="recipient@mailnator.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="guests"
                    onClick={companyHandler}
                    className="block mb-1 text-sm font-medium text-white hover:cursor-pointer">
                    + Additional Guests
                  </label>
                </div>
                {displayCompany && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="company-name" className="block text-sm font-medium text-white">
                        Company Name
                      </label>
                      <input
                        type="text"
                        autoComplete="text"
                        autoCorrect="off"
                        inputMode="text"
                        id="company-name"
                        name="companyName"
                        required={true}
                        className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:border-neutral-800 focus:outline-none focus:ring-1 sm:text-sm focus:ring-black selection:bg-green-500"
                        placeholder="Simba City"
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="company-email" className="block text-sm font-medium text-white">
                        Company Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          autoComplete="email"
                          autoCorrect="off"
                          inputMode="email"
                          name="companyEmail"
                          id="company-email"
                          required={true}
                          className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:border-neutral-800 focus:outline-none focus:ring-1 sm:text-sm focus:ring-black selection:bg-green-500"
                          placeholder="company@example.com"
                          onChange={(e) => setCompanyEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label htmlFor="notes" className="block mb-1 text-sm font-medium text-white">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    className="block w-full text-white border-gray-700 rounded-sm shadow-sm focus:ring-black bg-zinc-700 selection:bg-green-500 sm:text-sm"
                    placeholder="Please share anything that will help prepare for our meeting."
                    onChange={(e) => setNotes(e.target.value)}></textarea>
                </div>
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <button
                    type="submit"
                    className="relative inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-transparent border border-gray-800 rounded-sm bg-gray-50 font-m hover:text-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 hover:bg-gray-100">
                    {submitLoader && (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 justify-center"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {submitLoader && "Processing..."}
                    {!submitLoader && "Confirm"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelHandler}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-transparent rounded-sm hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </section>
  );
};

export default CreateBooking;
