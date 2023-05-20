import { Static, Type } from "@sinclair/typebox";
import { timeStamp } from "console";

/* 
 * PUT /attendance/:attendance 
 */

export const putAttendanceSchema = Type.Object({
    recordings: Type.Array(
      Type.Object({
        timestamp: Type.Date()
      })
    ),
});

export type PutAttendanceSchema = Static<typeof putAttendanceSchema>;

export const putAttendanceParams = Type.Object({
  attendanceId: Type.Number(),
});

export type PutAttendanceParams = Static<typeof putAttendanceParams>

/* 
 * POST /attendance/:userId
 */

export const postAttendanceParams = Type.Object({
  userId: Type.String(),
});
  
export type PostAttendanceParams = Static<typeof postAttendanceParams>;


/* 
 * GET /attendance/:userId
 */

export const getLastAttendancesParams = Type.Object({
  userId: Type.String(),
});
  
export type GetLastAttendancesParams = Static<typeof getLastAttendancesParams>;