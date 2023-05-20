import { PrismaClient } from "@prisma/client";

export const removeAllRecordingsByAttendanceId = (attendanceId: number, prisma: PrismaClient) =>
  prisma.recording.deleteMany({
    where: { attendanceId }
  });