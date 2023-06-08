import { Attendance, PrismaClient } from "@prisma/client";

export const createRecording = (attendanceId: number, timestamp: Date, prisma: PrismaClient) =>
  prisma.recording.create({
    data: {
      attendanceId: attendanceId,
      timestamp
    }
  })