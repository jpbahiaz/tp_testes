export type Recording = {
  id: string;
  timestamp: string;
  attendanceId: string;
};

export type Attendance = {
  id: string;
  userId: string;
  referenceDay: string;
  status: string;
  recordings: Recording[];
};

export type AttendanceStore = {
  all: Attendance[];
  addRecording: (recording: Recording) => void;
  saveRecordings: (attendanceId: string, recordings: Recording[]) => void;
};
