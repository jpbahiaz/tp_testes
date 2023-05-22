export type Recording = {
  id: string;
  timestamp: string;
  attendanceId: string;
};

export type Status = "PENDING" | "WAITING_APPROVAL" | "DONE"

export type Attendance = {
  id: string;
  userId: string;
  referenceDay: string;
  status: Status;
  recordings: Recording[];
};

export type AttendanceStore = {
  all: Attendance[];
  addRecording: (recording: Recording) => void;
  saveRecordings: (attendanceId: string, recordings: Recording[]) => void;
};
