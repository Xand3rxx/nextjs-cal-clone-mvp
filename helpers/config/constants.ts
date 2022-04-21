export const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * @description An easy way to manage routes in the application.
 * @return route name: string
 */
export const routes = {
  BASE_URL: "http:http://localhost:3330/",
  bookMeeting: "/api/api-service",
  confirmationPage: "/booking/confirmation",
  dashboard: "/profile",
  forgotPassword: "/auth/forgot-password",
  getDefaultEventtype: "/api/event-type",
  home: "/",
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/signup",
};
