import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../helpers/prisma";

/**
 * @description Find the the authenticated user Events greater than todays date.
 * @param userId: string
 * @param date: string
 * @return event: array
 * */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "You must be signed in to use this route." });
    return;
  }

  const upcomingBookings = await prisma.event.findMany({
    where: {
      userId: String(session?.id),
      startDateTime: {
        gte: new Date(Date.now()),
      },
    },
    include: {
      user: { select: { name: true } },
      attendee: { select: { name: true, email: true } },
      eventType: { select: { title: true, duration: true } },
    },
  });

  return res.status(200).json(upcomingBookings);
}
