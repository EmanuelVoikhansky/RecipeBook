import { type CanActivate, type ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';
import { GraphQLError } from 'graphql';
import { LOGIN_REQUIRED } from './login-required.decorator.js';

export const TOKEN = 'token';

/**
 * Port of CheckLoginAspect. Registered globally, it runs before every resolver and
 * only acts on those marked @LoginRequired(), the way the aspect's pointcut matched
 * @LoginRequired methods that were also GraphQL queries or mutations.
 */
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (context.getType<GqlContextType>() !== 'graphql') return true;
    const required = this.reflector.getAllAndOverride<boolean>(LOGIN_REQUIRED, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const { req } = GqlExecutionContext.create(context).getContext<{ req: Request }>();
    const sessionToken = req.session?.token;
    const headerToken = req.header(TOKEN);
    if (!sessionToken || sessionToken !== headerToken) {
      throw new GraphQLError('Not Authorized', { extensions: { code: 'UNAUTHENTICATED' } });
    }
    return true;
  }
}
