import { hashPassword } from "@helpers/auth";

export default async function Users() {
  return [
    {
      name: "Anonymous User",
      email: "anonymous.user@gmail.com",
      password: await hashPassword("password").then((res) => {
        return res;
      }),
    },
    {
      name: "Anthony Joboy",
      email: "anthonyjoboy2016@gmail.com",
      // password: await hashPassword("admin12345"),
      password: await hashPassword("admin12345").then((res) => {
        return res;
      }),
    },
  ];
}
