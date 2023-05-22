import { Attendance, PrismaClient } from "@prisma/client";

export const getAttendancesSinceDateByUserId = (userId: string, since: Date, prisma: PrismaClient) =>
  prisma.attendance.findMany({
    where: {
      userId,
      referenceDay: {
        gt: since
      }
    },
    include: {
      recordings: true,
    }
  })
