import { useNavigate, useParams } from "react-router-dom";
import { attendanceStore } from "../../modules/attendance/store";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  EditAttendanceActions,
  TimestampField,
  TimestampsContainer,
} from "./styles";
import { isTimestamp, timestampMask } from "./functions";
import axios from "axios";
import { BASE_URL } from "../../shared/constants";
import {
  maskFromDate,
  timestampFromDate,
} from "../../features/clockIn/functions";
import { userStore } from "../../modules/user/store";
import { useEffect, useState } from "react";

function EditAttendance() {
  const params = useParams<{ attendaceId: string }>();
  const navigate = useNavigate();
  const attendance = attendanceStore((state) =>
    state.all.find((att) => att.id == params.attendaceId)
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recordings:
        attendance?.recordings.map((r) => ({
          ...r,
          timestamp: timestampFromDate(new Date(r.timestamp)),
        })) || [],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "recordings",
  });
  const user = userStore((state) => state.currentUser);
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (attendance) {
      //saveRecordings(attendance.id, data.recordings);
      console.log(data.recordings);

      axios
        .put(`${BASE_URL}/attendance/${params.attendaceId}`, {
          recordings: data.recordings.map((r: { timestamp: string }) => {
            const date = attendance.referenceDay;
            const match = r.timestamp.match(/(\d+):(\d+)/);

            if (match) {
              date.setHours(parseInt(match[1]));
              date.setMinutes(parseInt(match[2]));
            }

            return date.toISOString();
          }),
        })
        .then(() => {
          console.log("saved");
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
          setMessage(e.response.data.message);
        });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return attendance ? (
    <div>
      <h1>{maskFromDate(new Date(attendance.referenceDay))}</h1>
      <h3>{attendance.status}</h3>
      {message && <h2>{message}</h2>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TimestampsContainer>
          {fields.map((recording, index) => (
            <TimestampField key={recording.id}>
              <input
                {...register(`recordings.${index}.timestamp`, {
                  validate: {
                    isTimestamp,
                  },
                })}
                onKeyUp={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (e.key != "Backspace") {
                    target.value = timestampMask(target.value);
                  }
                }}
              />
              {errors.recordings && errors.recordings[index]?.timestamp && (
                <div>Campo Inválido</div>
              )}
            </TimestampField>
          ))}
        </TimestampsContainer>
        <EditAttendanceActions>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Voltar
          </button>
          <button type="submit">Salvar</button>
        </EditAttendanceActions>
      </form>
    </div>
  ) : (
    <div>
      <div>Ponto não encontrado</div>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default EditAttendance;
