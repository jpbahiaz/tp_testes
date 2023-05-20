import { FastifyInstance } from "fastify";
import { GetUserParams, PostUserSchema, postUserSchema } from "./schemas";
import { createUser } from "../../modules/user/repository/createUser";

export async function usersController(fastify: FastifyInstance) {
  fastify.get("/users", async (req) => {
    req.log.info("Exemplo de log")
    return fastify.prisma.user.findMany();
  });

  fastify.get<{ Params: GetUserParams }>("/users/:userId", async (req) => {
    return fastify.prisma.user.findFirst({
      where: {
        id: req.params.userId,
      },
    });
  });

  fastify.post<{ Body: PostUserSchema }>(
    "/users",
    { schema: { body: postUserSchema } },
    async (req) => {
      return createUser(req.body, fastify);
    }
  );
}
