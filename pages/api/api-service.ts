import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Deter the request method
  switch (req.method) {
    case "GET": {
      return getBookings(req, res);
    }

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

/**
 * @description Get all meetings.
 * @return array
 * */
const getBookings = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check request method
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
  }
  //Current authenticated user session
  const session = await getSession({ req });

  const meetings = await prisma.user.findFirst({
    where: {
      // email: session?.user?.email,
      email: "anonymous.user@gmail.com",
    },
    include: {
      events: true,
      // events: {
      //   attendee: true,
      //   company: true,
      // },
    },
  });

  // const result = await prisma.event.findMany({
  //   where: {
  //     User: {
  //       email: {
  //         contains: 'prisma.io',
  //       },
  //     },
  //   },
  // });

  // const meetings = string[] || any;
  // Return the authenticated user's meeting list.
  return res.json({
    message: meetings,
  });
};

/**
 * @description Book a new meeting.
 * @param name: string
 * @param email: string
 * @param notes: string
 * @param companyName: string
 * @param companyEmail: string
 * @return json: object
 */
const createBooking = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check request method
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
  }

  // Get the body request from the form
  const data = req.body;
  const { name, email, companyName, companyEmail, notes } = data;

  //Current authenticated user session
  // const session = await getSession({ req });

  // if (!session) {
  //   res.status(403).json({ message: "Invalid user session." });
  //   // return;
  // }

  // Append email of authenticated user or default to `anonymous.user@gmail.com`
  // const userEmail = session?.user?.email || "anonymous.user@gmail.com";
  const userEmail = "anonymous.user@gmail.com";
  // let userEmail = "";
  // if (!session) {
  //   userEmail = "anonymous.user@gmail.com";
  // } else {
  //   userEmail = session?.user?.email;
  // }

  // Get the first event type from `EventType` table
  // const eventType = await prisma.eventType.findFirst({
  //   where: {
  //     id: 1,
  //   },
  // });

  // const userRecord = await prisma.user.findFirst({
  //   where: { email: userEmail },
  // });

  // Validate email inputs
  if (!email || !email.includes("@")) {
    // if (!email || !email.includes("@") || !companyEmail || !companyEmail.includes("@")) {
    res.status(422).json({ message: "Invalid email format." });
    return;
  }

  // Create a new event record
  try {
    const createdEvent = await prisma.event.create({
      data: {
        notes: notes,
        user: { connect: { email: userEmail } },
        eventType: { connect: { id: 1 } },
        attendee: { create: { name: name, email: email.toLowerCase() } },
        company: { create: { name: companyName, email: companyEmail.toLowerCase() } },
      },
      include: {
        user: true, // Include the user in the returned object
        eventType: true,
        attendee: true,
        company: true,
      },
    });

    // Return response object
    res.status(201).json({
      data: createdEvent,
      message: "Event created successfully.",
    });
  } catch (error) {
    // return the error
    // let message;
    // if (error instanceof Error) message = error.message;
    // else message = String(error);

    // return res.json({
    //   message: reportError({ message }),
    // });
    console.error(error);
  }
};
