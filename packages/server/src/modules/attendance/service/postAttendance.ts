import { FastifyInstance } from "fastify";
import { getUser } from "../../user/repository/getUser";
import { ApiError } from "../../../models/Error";
import { createAttendance } from "../repository/createAttendance";
import { getTodayAttendanceByUserId } from "../repository/getTodayAttendanceByUserId";
import { createRecording } from "../repository/createRecording";

export const postAttendance = async (userId: string, fastify: FastifyInstance) => {
    let user = await getUser(userId, fastify);

    if (!user) {
        throw new ApiError(404, "Usuário inválido!");
    }

    var attendance = await getTodayAttendanceByUserId(userId, fastify.prisma) ?? await createAttendance(userId, fastify.prisma)

    let now = new Date()
    createRecording(attendance.id, now, fastify.prisma)
}