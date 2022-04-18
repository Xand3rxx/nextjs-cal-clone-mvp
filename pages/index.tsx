import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { FaInfoCircle, FaClock, FaLink, FaLocationArrow, FaRegCalendarAlt } from "react-icons/fa";

const prisma = new PrismaClient();

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
  const eventType = await prisma.eventType.findFirst({
    where: {
      id: 1,
    },
  });

  console.table(JSON.stringify(eventType));

  return {
    props: eventType,
  };
};

// Component htmlFor dynamic react icons
export const Icon = ({ name }: IconProps) => (
  <span className="mr-[10px] ml-[2px] -mt-0 inline-block h-3.5 w-3.5 text-gray-400">{name}</span>
);

const Index: React.FC<EventProps> = (props) => {
  //Declare contants
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [calendarValue, setCalendarValue] = useState(new Date());

  const [isBookinPage, setIsBookinPage] = useState(true);
  const [isBookingConfirmationPage, setIsBookingConfirmationPage] = useState(false);
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [displayCompany, setDisplayCompany] = useState(false);

  /**
   * @description set dispalay of elements to true
   * @param value: string
   * @return boolean true
   */
  const onChange = (value: any) => {
    console.log(value);
    setTimeout(() => {
      setCalendarValue(calendarValue);
    }, 2000);
    setDisplayCalendar(!displayCalendar);
    setIsBookinPage(!isBookinPage);
    setIsBookingConfirmationPage(!isBookingConfirmationPage);
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

  useEffect(() => {
    if (session) window.location.replace("/private");
  }, [loading, session]);

  return (
    <section className="max-w-5xl mx-auto my-0 duration-500 ease-in-out transition-max-width md:my-24 ">
      <Link href="/auth/login">
        <a className="p-1 text-white bg-blue-800">LOGIN</a>
      </Link>
      <Link href="/auth/signup">
        <a className="p-1 ml-2 text-white bg-blue-800">SIGN UP</a>
      </Link>
      <h1 className="py-4 text-3xl font-bold text-white">This: {props?.title}</h1>

      <main className="max-w-5xl min-h-full rounded-sm border-color-custom backgroundSlateCustom">
        <div className="px-4 sm:flex sm:p-4 sm:py-5">
          <div className="px-4 pr-8 sm:flex sm:p-4 sm:py-5 sm:border-r sm:dark:border-gray-700 md:flex md:flex-col sm:w-1/3">
            <ul className=""></ul>
            <h2 className="mt-3 font-medium text-gray-300">Anthony Joboy</h2>
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
                {calendarValue.toString()}
              </p>
            )}
          </div>
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
                calendarClassName="rounded-sm react-datetime-picker__calendar react-calendar__tile react-calendar__month-view__weekdays react-calendar__tile--active react-datetime-picker__calendar--open text-white border border-gray-700 shadow-sm"
              />
            </div>
          )}
          {isBookingConfirmationPage && (
            <div className="mt-8 sm:mt-0 sm:min-w-[455px] w-full sm:w-1/2 sm:pl-4 sm:pr-6 text-white md:w-1/3">
              {/* <h1> {calendarValue.toString()}</h1> */}

              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Your name
                  </label>
                  <div className="mt-1">
                    <input
                      name="name"
                      type="text"
                      id="name"
                      required={true}
                      className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:ring-black selection:bg-green-500 sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="search"
                      autoComplete="email"
                      autoCorrect="off"
                      inputMode="email"
                      name="email"
                      required={true}
                      className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:border-neutral-800 focus:outline-none focus:ring-1 sm:text-sm focus:ring-black selection:bg-green-500"
                      placeholder="you@example.com"
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
                      <input
                        type="search"
                        autoComplete="email"
                        autoCorrect="off"
                        inputMode="email"
                        name="companyName"
                        required={true}
                        className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:border-neutral-800 focus:outline-none focus:ring-1 sm:text-sm focus:ring-black selection:bg-green-500"
                        placeholder="company@example.com"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Company Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="search"
                          autoComplete="email"
                          autoCorrect="off"
                          inputMode="email"
                          name="companyEmail"
                          required={true}
                          className="block w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-sm shadow-sm bg-zinc-700 focus:border-neutral-800 focus:outline-none focus:ring-1 sm:text-sm focus:ring-black selection:bg-green-500"
                          placeholder="company@example.com"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label htmlFor="notes" className="block mb-1 text-sm font-medium text-white">
                    Additional notes
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    className="block w-full text-white border-gray-700 rounded-sm shadow-sm focus:ring-black bg-zinc-700 selection:bg-green-500 sm:text-sm"
                    placeholder="Please share anything that will help prepare for our meeting."></textarea>
                </div>
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <button
                    type="submit"
                    className="relative inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-transparent border border-gray-800 rounded-sm bg-gray-50 font-m hover:text-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 hover:bg-gray-100">
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={cancelHandler}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-transparent rounded-sm hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default Index;
