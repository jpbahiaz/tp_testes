import { FastifyInstance } from "fastify";
import { ApiError } from "../../../models/error";
import { getAttendanceById } from "../repository/getAttendanceById";
import { removeAllRecordingsByAttendanceId } from "../repository/removeAllRecordingsByAttendanceId";
import { createRecording } from "../repository/createRecording";
import { compareAsc, isSameDay } from "date-fns";
import { updateAttendance } from "../repository/updateAttendance";

export const editAttendance = async (attendanceId: number, timestamps: Date[], fastify: FastifyInstance) => {
  let attendance = await getAttendanceById(attendanceId, fastify.prisma);

  if (!attendance) {
    throw new ApiError(404, "Ponto não registrado.");
  }

  validateRecordings(timestamps);

  attendance.status = "WAITING_APPROVAL";
  updateAttendance(attendance, fastify.prisma);

  await removeAllRecordingsByAttendanceId(attendanceId, fastify.prisma);

  let jobs = timestamps.map((timestamp) => {
    createRecording(attendanceId, timestamp, fastify.prisma)
  })

  Promise.all(jobs);
}

export const validateRecordings = (timestamps: Date[]) => {
  if (timestamps.length < 4) {
    // Mínimo 4 pontos necessários (Início expediente, início almoço, fim almoço, fim expediente)
    throw new ApiError(400, "Devem ser fornecidos os horários dos pontos registrados!");
  }

  if (hasOddSize(timestamps)) {
    throw new ApiError(400, `Os registros estão incompletos. Foram fornecidos somente ${timestamps.length} pontos`);
  }

  if (!areAllOnTheSameDay(timestamps)) {
    throw new ApiError(400, "Todas as os pontos registrados precisam ser no mesmo dia!");
  }

  if (!areTimestampsOrdered(timestamps)) {
    throw new ApiError(400, "Os pontos registrados precisam estar ordenados para ter consistência!")
  }
  return true
}

const areAllOnTheSameDay = (dates: Date[]): boolean => {
  const referenceDate = dates[0];

  for (let i = 1; i < dates.length; i++) {
    const currentDate = dates[i];
    if (!isSameDay(currentDate, referenceDate)) {
      return false;
    }
  }

  return true;
}

const areTimestampsOrdered = (dates: Date[]): boolean => {
  for (let i = 1; i < dates.length; i++) {
    const previousDate = dates[i - 1];
    const currentDate = dates[i];
    if (compareAsc(previousDate, currentDate) === 1) {
      return false;
    }
  }

  return true;
}

const hasOddSize = (array: any[]) => array.length % 2 != 0