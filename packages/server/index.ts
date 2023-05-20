import Fastify from "fastify";
import { PrettyOptions } from "pino-pretty";
import { usersController } from "./src/controllers/users";
import prismaPlugin from "./src/plugins/prisma";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyCors from "@fastify/cors";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
        colorize: true,
      } as PrettyOptions,
    },
  },
  production: true,
  test: false,
};

const environment = process.env.NODE_ENV || "development";
const port = parseInt(process.env.PORT ?? "3000");

const fastify = Fastify({
  logger: envToLogger[environment as keyof typeof envToLogger] ?? true, // defaults to true if no entry matches in the map
}).withTypeProvider<TypeBoxTypeProvider>();

// Plugins
fastify.register(fastifyCors, {
  origin: "http://localhost:5173",
});
fastify.register(prismaPlugin);

// Routes
fastify.register(usersController);

fastify.listen({ port, host: "0.0.0.0" }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
