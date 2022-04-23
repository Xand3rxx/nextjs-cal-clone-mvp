import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../helpers/prisma";

/**
 * @description Find the first Event that matches the filter.
 * @param id: string
 * @return event: object
 * */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const event = await prisma.event.findFirst({
    where: { id: String(req.query.id) },
    include: {
      user: { select: { name: true } },
      attendee: { select: { name: true, email: true } },
      eventType: { select: { duration: true } },
    },
  });

  res.status(200).json(event);
}
