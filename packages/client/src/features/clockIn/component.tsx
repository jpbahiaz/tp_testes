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
  maskFromDate,
  statusToColor,
  statusToText,
  timestampFromDate,
  toggleFilter,
} from "./functions";
import { useEffect, useState } from "react";
import { Status } from "../../modules/attendance/types";
import { userStore } from "../../modules/user/store";
import { BASE_URL } from "../../shared/constants";
import axios from "axios";

function ClockIn() {
  const user = userStore((state) => state.currentUser);
  const attendances = attendanceStore((state) => state.all);
  const attendancesReceived = attendanceStore(
    (state) => state.attendancesReceived
  );
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Set<Status>>(
    new Set(["DONE", "PENDING", "WAITING_APPROVAL"])
  );

  async function getAttendances() {
    if (user) {
      const res = await axios.get(`${BASE_URL}/attendance/${user.id}`);
      attendancesReceived(res.data);
      console.log(res.data);
    }
  }

  async function createRecording() {
    if (user) {
      await axios.post(`${BASE_URL}/attendance/${user.id}`);
      getAttendances();
    }
  }

  useEffect(() => {
    getAttendances();
  }, []);

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
                  <div className="date">
                    {maskFromDate(new Date(attendance.referenceDay))}
                  </div>
                  <div
                    className="status"
                    style={{ color: statusToColor(attendance.status) }}
                  >
                    {statusToText(attendance.status)}
                  </div>
                  <div className="recordings">
                    {attendance.recordings.map((recording) => (
                      <div key={recording.id}>
                        {timestampFromDate(new Date(recording.timestamp))}
                      </div>
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
