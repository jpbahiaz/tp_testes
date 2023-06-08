import { FastifyInstance } from "fastify";
import { getUser } from "../../user/repository/getUser";
import { ApiError } from "../../../models/error";
import { createAttendance } from "../repository/createAttendance";
import { getTodayAttendanceByUserId } from "../repository/getTodayAttendanceByUserId";
import { createRecording } from "../repository/createRecording";

export const postAttendance = async (userId: string, fastify: FastifyInstance) => {
    let user = await getUser(userId, fastify);

    if (!user) {
        throw new ApiError(404, "Usuário inválido!");
    }

    // Caso não exista um ponto iniciado no dia atual, ele é inicializado
    var attendance = await getTodayAttendanceByUserId(userId, fastify.prisma) ?? await createAttendance(userId, fastify.prisma)


    // É criado um registro no ponto do dia atual com o horário da requisição
    let now = new Date()
    attendance.recordings.push(await createRecording(attendance.id, now, fastify.prisma))

    return attendance
}