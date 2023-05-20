import { Static, Type } from "@sinclair/typebox";

export const postUserSchema = Type.Object({
  name: Type.String(),
  email: Type.String(),
});

export type PostUserSchema = Static<typeof postUserSchema>;

export const getUserParams = Type.Object({
  userId: Type.String(),
});

export type GetUserParams = Static<typeof getUserParams>;
