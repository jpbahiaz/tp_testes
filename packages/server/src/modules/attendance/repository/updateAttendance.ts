import { Attendance, PrismaClient } from "@prisma/client"

export const updateAttendance = (attendance: Attendance, prisma: PrismaClient) => 
    prisma.attendance.update({
        where: {
            id: attendance.id
        },
        data: {
            ...attendance
        }
    });
