import { FastifyInstance } from "fastify";
import { PostUserSchema } from "../../../controllers/users/schemas";
import { createUser } from "../repository/createUser";
import { ApiError } from "../../../models/error";

export const postUser = (body: PostUserSchema, fastify: FastifyInstance) => {

  validateUser(body);

  return createUser(body, fastify);
}

export const validateUser = (body: PostUserSchema) => {
  if(!isValidEmail(body.email)) {
    throw new ApiError(400, "O e-mail do colaborador é inválido");
  }

  if(!isValidName(body.name)) {
    throw new ApiError(400, "O nome do colaborador é inválido");
  }

  return true
}

const isValidEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const isValidName = (username: string) => /^[\p{L}\s]{3,}$/u.test(username);
