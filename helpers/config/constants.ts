export const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * @description An easy way to manage routes in the application.
 * @return route name: string
 */
export const routes = {
  bookMeeting: "/api/api-service",
  dashboard: "/dashboard",
  home: "/",
  login: "/auth/login",
  register: "/auth/signup",
};
