import { beforeEach, describe, expect, it } from "vitest";
import { addRecording, saveRecordings } from "./functions";
import { Attendance, AttendanceStore } from "./types";

describe("AttendanceStore", () => {
  let state: AttendanceStore;

  beforeEach(() => {
    state = {
      all: [] as Attendance[],
      addRecording: () => {},
      saveRecordings: () => {},
    };
  });

  it("should not add recording if no attendance present", () => {
    addRecording({ attendanceId: "", timestamp: "", id: "" }, state);

    expect(state.all.length).toEqual(0);
  });

  it("should only add recording if not present yet", () => {
    state.all.push({
      recordings: [{ attendanceId: "", timestamp: "23:00", id: "" }],
      status: "PENDING",
      id: "",
      userId: "",
      referenceDay: "",
    });

    addRecording({ attendanceId: "", timestamp: "23:00", id: "" }, state);
    addRecording({ attendanceId: "", timestamp: "18:00", id: "" }, state);
    addRecording({ attendanceId: "", timestamp: "18:00", id: "" }, state);

    expect(state.all.length).toEqual(1);
  });

  it("should not save recordings if no attendance present", () => {
    saveRecordings([{ attendanceId: "", timestamp: "", id: "" }], "", state);

    expect(state.all.length).toEqual(0);
  });

  it("should change status to WAITING_APPROVAL when saving recordings", () => {
    const recordings = [{ attendanceId: "", timestamp: "23:00", id: "" }];
    const attendance = {
      recordings: [],
      status: "PENDING",
      id: "attendance-id",
      userId: "",
      referenceDay: "",
    } as Attendance;
    state.all.push(attendance);

    saveRecordings(recordings, "attendance-id", state);

    expect(attendance.recordings).toBe(recordings);
    expect(attendance.status).toEqual("WAITING_APPROVAL");
  });
});
