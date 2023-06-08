import { FastifyInstance } from "fastify";
import { GetLastAttendancesParams, PostAttendanceParams, PutAttendanceParams, PutAttendanceSchema } from "./schemas";
import { postAttendance } from "../../modules/attendance/service/postAttendance";
import { editAttendance } from "../../modules/attendance/service/editAttendance";
import { getLastAttendances } from "../../modules/attendance/service/getLastAttendances";
import { parseISO } from "date-fns";

export async function attendanceController(fastify: FastifyInstance) {
    fastify.post<{ Params: PostAttendanceParams }>(
        "/attendance/:userId",
        async (req, reply) => {
            return await postAttendance(req.params.userId, fastify)
        }
    )

    fastify.put<{ Body: PutAttendanceSchema, Params: PutAttendanceParams }>(
        "/attendance/:attendanceId",
        async (req, reply) => {
            let timestamps = req.body.recordings.map((it) => parseISO(it))
            
            return await editAttendance(Number(req.params.attendanceId), timestamps, fastify)
        }
    )

    fastify.get<{ Params: GetLastAttendancesParams}>(
        "/attendance/:userId",
        async (req, reply) => {
            return await getLastAttendances(req.params.userId, fastify)
        }
    )
}