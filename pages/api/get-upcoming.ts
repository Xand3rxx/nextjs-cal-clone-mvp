import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../helpers/prisma";

/**
 * @description Find the Events that matches the filter.
 * @param userId: string
 * @param date: string
 * @return event: array
 * */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  console.log("Current ", session?.user?.email);

  // if (!session) {
  //   res.status(401).json({ message: "Not authenticated" });
  //   return;
  // }

  const userId = await prisma.user.findFirst({
    where: { email: String(session?.user?.email) },
    select: { id: true },
  });

  const upcomingBookings = await prisma.event.findMany({
    where: {
      userId: userId?.id,
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
