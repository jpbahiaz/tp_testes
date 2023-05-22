import { differenceInMinutes } from "date-fns";

export const getAttendanceStatusByRecordings = (recordings: Date[]) => {
  if (recordings.length % 2 != 0 || recordings.length < 4) return "PENDING";

  return "DONE"
}

function calculateWorkedMinutes(dates: Date[]): number {
  let workedMinutes = 0;

  if (dates.length % 2 !== 0) {
    throw new Error('O número de datas deve ser par');
  }

  for (let i = 0; i < dates.length; i += 2) {
    const startTime = dates[i];
    const stopTime = dates[i + 1];

    workedMinutes += differenceInMinutes(startTime, stopTime);
  }

  return workedMinutes;
}