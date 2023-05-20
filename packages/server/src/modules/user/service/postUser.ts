import { FastifyInstance } from "fastify";
import { PostUserSchema } from "../../../controllers/users/schemas";
import { createUser } from "../repository/createUser";

export const postUser = (body: PostUserSchema, fastify: FastifyInstance) =>
  createUser(body, fastify);
