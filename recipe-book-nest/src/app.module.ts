import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { Request, Response } from 'express';
import { DevDataSeeder } from './dev-data.seeder.js';
import { Author } from './entity/author.entity.js';
import { Recipe } from './entity/recipe.entity.js';
import { LoginGuard } from './security/login.guard.js';
import { RecipeResolver } from './service/recipe.resolver.js';
import { ViewerContext } from './service/viewer-context.js';

@Module({
  imports: [
    // In-memory SQLite (WebAssembly build, no native compile step) stands in for in-memory H2:
    // the schema is created on boot and the data is gone on restart.
    TypeOrmModule.forRoot({
      type: 'sqljs',
      entities: [Author, Recipe],
      synchronize: true,
      autoSave: false,
    }),
    TypeOrmModule.forFeature([Author, Recipe]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: true,
      sortSchema: true,
      // GraphiQL on GET /graphql in every environment, like graphql.spqr.gui.enabled=true.
      // It needs introspection, which Apollo otherwise turns off when NODE_ENV=production.
      graphiql: true,
      introspection: true,
      includeStacktraceInErrorResponses: false,
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
    }),
  ],
  providers: [RecipeResolver, ViewerContext, DevDataSeeder, { provide: APP_GUARD, useClass: LoginGuard }],
})
export class AppModule {}
