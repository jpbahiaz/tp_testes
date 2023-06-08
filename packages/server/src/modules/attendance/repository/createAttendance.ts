import { PrismaClient } from "@prisma/client";
import { startOfDay } from "date-fns";

export const createAttendance = (userId: string, prisma: PrismaClient) =>
  prisma.attendance.create({
    data: {
      referenceDay: startOfDay(new Date()),
      userId: userId,
    }, 
    include: {
      recordings: true
    } 
  });