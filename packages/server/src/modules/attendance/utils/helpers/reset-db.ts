import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction([
    prisma.recording.deleteMany(),
    prisma.attendance.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
