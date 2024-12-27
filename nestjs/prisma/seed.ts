import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.stateOfProject.createMany({
    data: [
      { id: 1, state: 'Created' },
      { id: 2, state: 'In progress' },
      { id: 3, state: 'On hold' },
      { id: 4, state: 'Completed' },
      { id: 5, state: 'Cancelled' },
      { id: 6, state: 'Closed' },
    ],
  });

  await prisma.role.createMany({
    data: [
      { id: 1, role: 'Admin' },
      { id: 2, role: 'Manager' },
      { id: 3, role: 'User' },
    ],
  });
}

main();