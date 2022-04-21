// import { hashPassword } from "@helpers/auth";

// export async function passwordHandler(value: string) {
//   const password = await Promise.re(hashPassword(value));

//   return await password;
// }

export const EventTypes = [
  {
    title: "30 Min Meeting",
    url: "/30-min-meeting",
    duration: 30,
    description: "A brief meeting for 30 minutes discussions.",
    location: "Google Meet",
    meetingLink: "https://meet.google.com/vqi-xnvk-uda",
    availability: "Mon - Fri, 9:00 AM - 5:00 PM",
  },
  {
    title: "1 Hour Meeting",
    url: "/1-hr-meeting",
    duration: 60,
    description: "A one hour meeting for different discussions.",
    location: "Google Meet",
    meetingLink: "https://meet.google.com/vqi-xnvk-uda",
    availability: "Mon - Fri, 9:00 AM - 5:00 PM",
  },
];

export const Users = [
  {
    name: "Anonymous User",
    email: "default.user@gmail.com",
    password: "$2a$04$yuTrGkc0TwepzAc.rOImauOMASkHx0jP6wvVQtY7rerVpwS8LQlfC",
  },
  {
    name: "Anthony Joboy",
    email: "anthonyjoboy2016@gmail.com",
    password: "$2a$04$QzGE0.brs7TLfORGVYGp5ecSgvA2dY1Vt1ddHTXOcNQmm6bVzkphO",
  },
];
