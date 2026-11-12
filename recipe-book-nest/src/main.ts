import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import session from 'express-session';
import { AppModule } from './app.module.js';

const secret = process.env.SESSION_SECRET;
if (!secret && process.env.NODE_ENV === 'production') {
  throw new Error('SESSION_SECRET must be set in production');
}

const app = await NestFactory.create<NestExpressApplication>(AppModule);

// Server-side session, the equivalent of the Java HttpSession: login stores the token and
// user ID here, and the browser carries only the session cookie.
app.use(
  session({
    secret: secret ?? 'recipe-book-dev-only-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' },
  }),
);

// The Java build served GraphiQL at /gui; keep that URL working.
app.use('/gui', (_req: Request, res: Response) => res.redirect('/graphql'));

const port = Number(process.env.PORT ?? 8080);
await app.listen(port);
console.log(`RecipeBook GraphQL on http://localhost:${port}/graphql (GraphiQL: open it in a browser)`);
