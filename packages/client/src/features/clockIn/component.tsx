import { useNavigate } from "react-router-dom";
import { attendanceStore } from "../../modules/attendance/store";
import {
  AttendanceItem,
  AttendanceList,
  ClockInButtonContainer,
} from "./styles";
import { v4 } from "uuid";

function ClockIn() {
  const attendances = attendanceStore((state) => state.all);
  const addRecording = attendanceStore((state) => state.addRecording);
  const navigate = useNavigate();

  function createRecording() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Temporário enquanto não chama o back
    addRecording({
      id: v4(),
      attendanceId: "",
      timestamp: `${hours}:${minutes}`,
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
              <div className="status">{attendance.status}</div>
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
