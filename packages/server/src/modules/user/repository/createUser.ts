import { PrismaClient, User } from "@prisma/client";
import { PostUserSchema } from "../../../controllers/users/schemas";
import { FastifyInstance } from "fastify";

export const isUser = (u: any): u is User => Boolean(u.name && u.email);

const persistUser = (body: PostUserSchema, prisma: PrismaClient) =>
  prisma.user.create({
    data: body,
  });

export const createUser = (body: PostUserSchema, fastify: FastifyInstance) =>
  persistUser(body, fastify.prisma);
