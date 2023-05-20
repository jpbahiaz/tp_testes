import { PrismaClient } from "@prisma/client";
import { startOfDay } from "date-fns";

export const getTodayAttendanceByUserId = (userId: string, prisma: PrismaClient) =>
  prisma.attendance.findFirst({
    where: {
      userId,
      referenceDay: startOfDay(new Date())
    },
  });
