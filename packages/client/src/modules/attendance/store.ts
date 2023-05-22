import { create } from "zustand";
import { Attendance, AttendanceStore, Recording } from "./types";
import { produce } from "immer";
import { addRecording, saveRecordings } from "./functions";

export const attendanceStore = create<AttendanceStore>((set) => ({
  all: [
    {
      status: "PENDING",
      id: "5123-sdaf",
      userId: "",
      recordings: [
        { id: "6334-gadf", timestamp: "08:00", attendanceId: "52545-gad" },
        { id: "6335-gadf", timestamp: "12:00", attendanceId: "52545-gad" },
      ],
      referenceDay: "20/05/2023",
    },
    {
      status: "DONE",
      id: "5124-sdaf",
      userId: "",
      recordings: [
        { id: "6334-gadf", timestamp: "08:00", attendanceId: "52545-gad" },
        { id: "6335-gadf", timestamp: "12:00", attendanceId: "52545-gad" },
        { id: "6336-gadf", timestamp: "16:00", attendanceId: "52545-gad" },
        { id: "6337-gadf", timestamp: "16:30", attendanceId: "52545-gad" },
        { id: "6338-gadf", timestamp: "18:00", attendanceId: "52545-gad" },
      ],
      referenceDay: "19/05/2023",
    },
  ],
  attendancesReceived: (attendances: Attendance[]) => set({ all: attendances }),
  addRecording: (recording: Recording) =>
    set(produce<AttendanceStore>((state) => addRecording(recording, state))),
  saveRecordings: (attendanceId: string, recordings: Recording[]) =>
    set(
      produce<AttendanceStore>((state) =>
        saveRecordings(recordings, attendanceId, state)
      )
    ),
}));
