import { User } from "@prisma/client";
import { FastifyInstance } from "fastify";

export const getUser = (userId: string, fastify: FastifyInstance) =>
  fastify.prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
