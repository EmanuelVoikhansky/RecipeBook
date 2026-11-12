import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import type { Request } from 'express';
import { GraphQLError } from 'graphql';
import type { Repository } from 'typeorm';
import type { Login } from '../dto/login.js';
import { Author } from '../entity/author.entity.js';
import { TOKEN } from '../security/login.guard.js';
import '../security/session-data.js';

/**
 * Tracks who the viewer is for the current request, backed by the server-side session.
 * Request-scoped, like the request-bound proxy Spring injected into the Java version.
 * The default in-memory session store only works for a single process; use a shared
 * store (for example Redis) before running more than one instance.
 */
@Injectable({ scope: Scope.REQUEST })
export class ViewerContext {
  constructor(
    @Inject(CONTEXT) private readonly ctx: { req: Request },
    @InjectRepository(Author) private readonly authors: Repository<Author>,
  ) {}

  login(login: Login): void {
    const { session } = this.ctx.req;
    session[TOKEN] = login.token;
    session.userId = login.user.id;
  }

  async getUser(): Promise<Author | null> {
    const userId = this.ctx.req.session.userId;
    return userId == null ? null : this.authors.findOneBy({ id: userId });
  }

  async getUserX(): Promise<Author> {
    const user = await this.getUser();
    if (!user) throw new GraphQLError('User not logged in', { extensions: { code: 'UNAUTHENTICATED' } });
    return user;
  }
}
