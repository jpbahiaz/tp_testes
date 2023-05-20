import { useNavigate, useParams } from "react-router-dom";
import { attendanceStore } from "../../modules/attendance/store";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { EditAttendanceActions } from "./styles";

function EditAttendance() {
  const params = useParams<{ attendaceId: string }>();
  const navigate = useNavigate();
  const attendance = attendanceStore((state) =>
    state.all.find((att) => att.id == params.attendaceId)
  );
  const saveRecordings = attendanceStore((state) => state.saveRecordings);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      recordings: attendance?.recordings || [],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "recordings",
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    if (attendance) {
      saveRecordings(attendance.id, data.recordings);
      console.log("saved")
    }

    navigate("/")
  };

  return attendance ? (
    <div>
      <h1>{attendance.referenceDay}</h1>
      <h3>{attendance.status}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((recording, index) => (
          <input
            key={recording.id}
            {...register(`recordings.${index}.timestamp`)}
          />
        ))}
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
