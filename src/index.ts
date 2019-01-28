import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema, formatArgumentValidationError } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './modules/Redis';
import { Context } from 'apollo-server-core';

async function bootstrap() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.ts'],
    authChecker: ({ context: { req } }) => {
      return !!req.session!.userId;
    }
  });

  const server = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: Context) => ({ req })
  });

  const app = express();
  const redisStore = connectRedis(session);

  app.use(
    session({
      name: 'sessionId',
      secret: 'fixme',
      store: new redisStore({
        client: redis as any
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 60 * 60 * 1000)
      }
    })
  );

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server read at http://localhost:4000${server.graphqlPath}`)
  );
}

bootstrap();
