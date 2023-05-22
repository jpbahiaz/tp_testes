import { useNavigate } from "react-router-dom";
import { attendanceStore } from "../../modules/attendance/store";
import {
  AttendanceFilters,
  AttendanceItem,
  AttendanceList,
  ClockInButtonContainer,
} from "./styles";
import { v4 } from "uuid";
import {
  isFilterSelected,
  statusToColor,
  statusToText,
  timestampFromDate,
  toggleFilter,
} from "./functions";
import { useState } from "react";
import { Status } from "../../modules/attendance/types";

function ClockIn() {
  const attendances = attendanceStore((state) => state.all);
  const addRecording = attendanceStore((state) => state.addRecording);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Set<Status>>(
    new Set(["DONE", "PENDING", "WAITING_APPROVAL"])
  );

  function createRecording() {
    // Temporário enquanto não chama o back
    addRecording({
      id: v4(),
      attendanceId: "",
      timestamp: timestampFromDate(new Date()),
    });
  }

  return (
    <div>
      <ClockInButtonContainer>
        <button onClick={createRecording}>Marcar Ponto</button>
      </ClockInButtonContainer>
      {attendances.length ? (
        <>
          <AttendanceFilters>
            <button
              onClick={() => setFilters(toggleFilter(filters, "DONE"))}
              className={isFilterSelected(filters, "DONE") ? "selected" : ""}
            >
              {statusToText("DONE")}
            </button>
            <button
              onClick={() => setFilters(toggleFilter(filters, "PENDING"))}
              className={isFilterSelected(filters, "PENDING") ? "selected" : ""}
            >
              {statusToText("PENDING")}
            </button>
            <button
              onClick={() =>
                setFilters(toggleFilter(filters, "WAITING_APPROVAL"))
              }
              className={
                isFilterSelected(filters, "WAITING_APPROVAL") ? "selected" : ""
              }
            >
              {statusToText("WAITING_APPROVAL")}
            </button>
          </AttendanceFilters>
          <AttendanceList>
            {attendances
              .filter((attendance) => filters.has(attendance.status))
              .map((attendance) => (
                <AttendanceItem
                  onClick={() => {
                    navigate("/edit/" + attendance.id);
                  }}
                  key={attendance.id}
                >
                  <div className="date">{attendance.referenceDay}</div>
                  <div
                    className="status"
                    style={{ color: statusToColor(attendance.status) }}
                  >
                    {statusToText(attendance.status)}
                  </div>
                  <div className="recordings">
                    {attendance.recordings.map((recording) => (
                      <div key={recording.id}>{recording.timestamp}</div>
                    ))}
                  </div>
                </AttendanceItem>
              ))}
          </AttendanceList>
        </>
      ) : (
        <AttendanceList>Nenhum ponto encontrado</AttendanceList>
      )}
    </div>
  );
}

export default ClockIn;
