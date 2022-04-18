import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Deter the request method
  switch (req.method) {
    // case "GET": {
    //   return getBookings(req, res);
    // }

    case "POST": {
      return createBooking(req, res);
    }

    // case "PUT": {
    //   return updateEvent(req, res);
    // }

    // case "DELETE": {
    //   return deleteEvent(req, res);
    // }
  }
}

// Function to get all meetings
// const getBookings = async (req, res) => {
//   if (req.method === "GET") {
//     try {
//       // connect to the database
//       const { db } = await MONGODB_CONNECTION();

//       // fetch the posts
//       let results = await db
//         .collection(process.env.COLLECTION_NAME)
//         .find({})
//         .toArray();

//       // return the posts
//       return res.json({
//         message: results,
//         success: true,
//       });
//     } catch (error) {
//       // return the error
//       return res.json({
//         message: new Error(error).message,
//         success: false,
//       });
//     }
//   }
// };

// Function to book a new meeting
const createBooking = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Get body request
    const data = req.body;
    const { name, email, companyName, companyEmail, notes } = data;
    const session = await getSession({ req });
    const eventType = await prisma.eventType.findFirst({
      where: {
        id: 1,
      },
    });

    if (!email || !email.includes("@") || !companyEmail || !companyEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }
    // "anonymous.user@gmail.com"
    await prisma.event.create({
      data: {
        notes: notes,
        User: { connect: { email: session?.user?.email } },
        eventType: { connect: { id: eventType?.id } },
        attendee: { create: { name: name, email: email.toLowerCase() } },
        company: { create: { name: companyName, email: companyEmail.toLowerCase() } },
      },
      include: {
        eventType: true, // Include the eventType in the returned object
        attendee: true,
        company: true,
      },
    });

    res.status(201).json({
      message: "Post created successfully.",
    });
  }
};
