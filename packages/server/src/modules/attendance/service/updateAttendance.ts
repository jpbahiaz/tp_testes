import { FastifyInstance } from "fastify";
import { ApiError } from "../../../models/Error";
import { getAttendanceById } from "../repository/getAttendanceById";
import { removeAllRecordingsByAttendanceId } from "../repository/removeAllRecordingsByAttendanceId";
import { createRecording } from "../repository/createRecording";

export const updateAttendance = async (attendanceId: number, timestamps: Date[], fastify: FastifyInstance) => {
    let attendance = await getAttendanceById(attendanceId, fastify.prisma);

    if (!attendance) {
        throw new ApiError(404, "Ponto não registrado.");
    }

    await removeAllRecordingsByAttendanceId(attendanceId, fastify.prisma);

    let jobs = timestamps.map((timestamp) => {
        createRecording(attendanceId, timestamp, fastify.prisma)
    })

    Promise.all(jobs);
}