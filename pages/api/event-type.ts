import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../helpers/prisma";

/**
 * @description Find the first EventType.
 * @return eventType: object
 * */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const eventType = await prisma.eventType.findFirst({
    where: {
      id: 1,
    },
  });

  res.status(200).json(eventType);
}
