import { Attendance, PrismaClient } from "@prisma/client";

export const updateAttendance = (
    id: number,
    attendance: Partial<Attendance>,
    prisma: PrismaClient
) =>
    prisma.attendance.update({
        where: {
            id,
        },
        data: attendance,
    });
