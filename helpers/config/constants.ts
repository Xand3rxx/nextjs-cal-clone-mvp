export const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * @description An easy way to manage routes in the application.
 * @return route name: string
 */
export const routes = {
  BASE_URL: "http:http://localhost:3330/",
  bookMeeting: "/api/api-service",
  confirmationPage: "/booking/[id]",
  createMeetingPage: "/booking",
  upcomingBooking: "/profile/booking/upcoming",
  pastBooking: "/profile/booking/past",
  forgotPassword: "/auth/forgot-password",
  getEvent: "/api/get-event",
  getDefaultEventType: "/api/event-type",
  getPastBookings: "/api/get-past",
  getUpcomingBookings: "/api/get-upcoming",
  home: "/",
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/signup",
  signUp: "/api/auth/signup",
};
