import { PrismaClient } from "@prisma/client";

import { EventTypes, Users } from "./seeds/event-types";

// import Users from "./seeds/users";

const prisma = new PrismaClient();

async function main() {
  await prisma.eventType.createMany({
    data: EventTypes,
  });
  await prisma.user.createMany({
    data: Users,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
