import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../helpers/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const eventType = await prisma.eventType.findFirst({
    where: {
      id: 1,
    },
  });

  res.json(eventType);
}
