import { AttendanceStore, Recording } from "./types";

export function addRecording(recording: Recording, state: AttendanceStore) {
  const attendance = state.all[0];
  if (
    attendance &&
    !attendance.recordings.find((rec) => rec.timestamp === recording.timestamp)
  ) {
    attendance.recordings.push(recording);
  }
}

export function saveRecordings(
  recordings: Recording[],
  attendanceId: string,
  state: AttendanceStore
) {
  const attendance = state.all.find((att) => att.id == attendanceId);
  if (attendance) {
    attendance.recordings = recordings;
    attendance.status = "WAITING_APPROVAL";
  }
}
