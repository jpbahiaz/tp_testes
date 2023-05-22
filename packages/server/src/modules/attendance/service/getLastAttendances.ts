import { FastifyInstance } from "fastify";
import { ApiError } from "../../../models/Error";
import { Attendance } from "@prisma/client";
import { getUser } from "../../user/repository/getUser";
import { startOfWeek } from "date-fns";
import { startOfDay } from "date-fns";
import { getAttendancesSinceDateByUserId } from "../repository/getAttendancesSinceDateByUserId";

export const getLastAttendances = async (userId: string, fastify: FastifyInstance): Promise<ApiError | Attendance[]> => {
    let user = await getUser(userId, fastify);

    if (!user) {
        throw new ApiError(404, "Usuário inválido");
    }

    let beginningOfTheWeek = startOfDay(startOfWeek(new Date()))

    return await getAttendancesSinceDateByUserId(user.id, beginningOfTheWeek, fastify.prisma)
}