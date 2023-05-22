import { useNavigate } from "react-router-dom";
import { attendanceStore } from "../../modules/attendance/store";
import {
  AttendanceItem,
  AttendanceList,
  ClockInButtonContainer,
} from "./styles";
import { v4 } from "uuid";
import { statusToColor, statusToText, timestampFromDate } from "./functions";

function ClockIn() {
  const attendances = attendanceStore((state) => state.all);
  const addRecording = attendanceStore((state) => state.addRecording);
  const navigate = useNavigate();

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
        <AttendanceList>
          {attendances.map((attendance) => (
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
      ) : (
        <AttendanceList>Nenhum ponto encontrado</AttendanceList>
      )}
    </div>
  );
}

export default ClockIn;
