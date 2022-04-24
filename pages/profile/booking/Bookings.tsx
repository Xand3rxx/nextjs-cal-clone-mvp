import { Event } from "@prisma/client";

export type Props = {
  bookings: [];
};

/**
 * @description Convert datetime to return time only
 * @param dateString: string
 * @return time: string
 */
const convertDateToTime = (dateString: string | number) => {
  const newDate = new Date(dateString);
  let hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  // hours = hours ? hours : 12; // the hour '0' should be '12'
  const newHours = hours < 10 ? "0" + hours : 12; // the hour '0' should be '12'
  const newMinutes = minutes < 10 ? "0" + minutes : minutes;
  return newHours + ":" + newMinutes + ampm;
};

const Bookings = ({ bookings }: Props) => {
  return (
    <div className="mt-6 overflow-hidden rounded-sm border border-b border-neutral-700">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white" data-testid="bookings">
          {bookings &&
            bookings.map((booking: Event | any) => (
              <tr className="flex" key={booking.id}>
                <td className="hidden whitespace-nowrap py-4 align-top pl-6 pr-6 sm:table-cell">
                  <div className="text-sm leading-6 text-gray-900">
                    {new Date(booking.startDateTime).toDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {convertDateToTime(booking.startDateTime)} - {convertDateToTime(booking.endDateTime)}
                  </div>
                </td>
                <td className="flex-1 py-4 pl-4 pr-4">
                  <div className="sm:hidden">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(booking.startDateTime).toDateString()}:{" "}
                      <small className="text-sm text-gray-500">
                        {convertDateToTime(booking.startDateTime)} - {convertDateToTime(booking.endDateTime)}{" "}
                      </small>
                    </div>
                  </div>
                  <div
                    title="Quick Chat between Anthony Joboy and Dummy Form"
                    className="max-w-56 truncate text-sm font-medium leading-6 text-neutral-900 md:max-w-max">
                    {booking?.eventType?.title} between {booking?.user?.name} and {booking?.attendee?.name}
                  </div>
                  <div
                    className="max-w-52 md:max-w-96 truncate text-sm text-gray-500"
                    title="No additional notes">
                    {booking?.notes}
                  </div>
                  <div className="text-sm text-gray-900 hover:text-blue-500">
                    <a href={booking?.attendee?.email}>{booking?.attendee?.email}</a>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 text-right text-sm font-medium pr-4 pl-4"></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
