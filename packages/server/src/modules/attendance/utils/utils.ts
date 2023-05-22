import { differenceInMinutes } from "date-fns";
import { th } from "date-fns/locale";

export const getAttendanceStatusByRecordings = (recordings: Date[]) => {
  if (recordings.length % 2 != 0 || recordings.length < 4) return "PENDING";

  return "DONE"
}

export function calculateWorkedMinutes(dates: Date[]): number {
  let workedMinutes = 0;

  if (dates.length % 2 !== 0) {
    throw new Error('O número de datas deve ser par');
  }

  for (let i = 0; i < dates.length; i += 2) {
    const startTime = dates[i];
    const stopTime = dates[i + 1];

    workedMinutes += differenceInMinutes(stopTime, startTime);
  }

  return workedMinutes;
}

export function hasCompletedWorkday(workdayMinutes: number, dates: Date[]) {
  let workedMinutes = calculateWorkedMinutes(dates);
  return workedMinutes >= workdayMinutes;
}

export function calculateExtraWorkedTime(workdayMinutes: number, dates: Date[]) {
  let extraMinutes = calculateWorkedMinutes(dates) - workdayMinutes;
  
  if (extraMinutes < 0) throw Error("Jornada de trabalho menor que o previsto")

  return extraMinutes
}
