import { describe, expect, it, beforeEach } from "vitest";
import prisma from "./utils/helpers/prisma";
import resetDb from "./utils/helpers/reset-db";
import { createAttendance } from "./repository/createAttendance";
import { createUser } from "../user/repository/createUser";
import { FastifyInstance } from "fastify";
import { createRecording } from "./repository/createRecording";
import { removeAllRecordingsByAttendanceId } from "./repository/removeAllRecordingsByAttendanceId";
import { updateAttendance } from "./repository/updateAttendance";
import { getAttendanceById } from "./repository/getAttendanceById";

describe("Attendance integration tests", () => {
  const userData = { name: "User Teste", email: "user@teste.com" };
  const fastify = {
    prisma,
  } as FastifyInstance;

  beforeEach(async () => {
    await resetDb();
  });

  it("should create attendance for given userId", async () => {
    const user = await createUser(userData, fastify);

    await createAttendance(user.id, prisma);
    const userAttendances = await prisma.attendance.findMany({
      where: {
        userId: user.id,
      },
    });

    expect(userAttendances.length).toBe(1);
  });

  it("should create recording for attendanceId", async () => {
    const user = await createUser(userData, fastify);
    const attendance = await createAttendance(user.id, prisma);
    const date = new Date();

    await createRecording(attendance.id, date, prisma);

    const attendanceRecordings = await prisma.recording.findMany({
      where: {
        attendanceId: attendance.id,
      },
    });

    expect(attendanceRecordings.length).toBe(1);
    expect(attendanceRecordings[0].timestamp.getTime()).toEqual(date.getTime());
  });

  it("should remove all recording for given attendanceId", async () => {
    const user = await createUser(userData, fastify);
    const attendance = await createAttendance(user.id, prisma);
    const date = new Date();

    await createRecording(attendance.id, date, prisma);
    await createRecording(attendance.id, date, prisma);
    await createRecording(attendance.id, date, prisma);

    await removeAllRecordingsByAttendanceId(attendance.id, prisma);

    const attendanceRecordings = await prisma.recording.findMany({
      where: {
        attendanceId: attendance.id,
      },
    });

    expect(attendanceRecordings.length).toBe(0);
  });

  it("should be possible to update the status of an attendance", async () => {
    const user = await createUser(userData, fastify);
    const attendance = await createAttendance(user.id, prisma);

    await updateAttendance(
      attendance.id,
      { status: "WAITING_APPROVAL" },
      prisma
    );

    const updated = await prisma.attendance.findFirst({
      where: {
        id: attendance.id,
      },
    });

    expect(updated?.status).toEqual("WAITING_APPROVAL");
  });

  it("should be possible to get an attendance with its recordings", async () => {
    const user = await createUser(userData, fastify);
    const attendance = await createAttendance(user.id, prisma);
    const date = new Date();

    await createRecording(attendance.id, date, prisma);
    await createRecording(attendance.id, date, prisma);
    await createRecording(attendance.id, date, prisma);

    const result = await getAttendanceById(attendance.id, prisma);

    expect(result).toBeDefined()
    expect(result?.recordings).toBeDefined()
    expect(result?.recordings.length).toEqual(3)
  });
});
