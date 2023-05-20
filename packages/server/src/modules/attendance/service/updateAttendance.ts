import { FastifyInstance } from "fastify";
import { ApiError } from "../../../models/Error";
import { getAttendanceById } from "../repository/getAttendanceById";
import { removeAllRecordingsByAttendanceId } from "../repository/removeAllRecordingsByAttendanceId";
import { createRecording } from "../repository/createRecording";

export const updateAttendance = async (attendanceId: number, timestamps: Date[], fastify: FastifyInstance): Promise<ApiError | undefined> => {
    let attendance = await getAttendanceById(attendanceId, fastify.prisma);

    if (!attendance) {
        return { statusCode: 404, message: "Ponto não registrado." };
    }

    await removeAllRecordingsByAttendanceId(attendanceId, fastify.prisma);

    let jobs = timestamps.map((timestamp) => {
        createRecording(attendanceId, timestamp, fastify.prisma)
    })

    Promise.all(jobs);
}