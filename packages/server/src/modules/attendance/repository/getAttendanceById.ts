import { PrismaClient } from "@prisma/client";

export const getAttendanceById = (id: number, prisma: PrismaClient) =>
  prisma.attendance.findFirst({
    where: {
      id
    },
    include: {
      recordings: true
    }
  });