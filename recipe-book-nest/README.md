# recipe-book-nest

NestJS port of `recipe-book-java`, a drop-in replacement for it: the same GraphQL
schema on `POST /graphql` (port 8080), the same login rules, and GraphiQL in the browser
at `/graphql` (`/gui` redirects there).

New to Nest from Java EE? See [docs/nestjs-for-java-ee-developers.md](../docs/nestjs-for-java-ee-developers.md).

## Run

Needs Node 24.11+. From the repo root, `start-backend-nest.cmd` uses the portable Node in
`.node\`. Or, with Node on your PATH:

```
npm install
npm run build
npm start          # or: npm run start:dev  (rebuilds on change)
```

Set `SESSION_SECRET` in production (startup fails without it when `NODE_ENV=production`).

## Where the Java pieces went

| recipe-book-java | recipe-book-nest |
|---|---|
| `GraphQLService` (`@GraphQLApi`) | `src/service/recipe.resolver.ts` (`@Resolver`) |
| `@LoginRequired` + `CheckLoginAspect` | `@LoginRequired()` + `LoginGuard`, registered globally as `APP_GUARD` |
| `ViewerContext` (request-bound `HttpSession`) | request-scoped `ViewerContext` over `express-session` |
| `Author`, `Recipe`, `RecipeDraft` (JPA) | TypeORM entities + `RecipeDraftInput` |
| `AuthorRepository`, `RecipeRepository` | TypeORM `Repository<T>` via `@InjectRepository` |
| In-memory H2 + `ApplicationRunner` seed | In-memory SQLite (sql.js) + `DevDataSeeder` |
| SPQR `Long` scalar | `src/graphql/long.scalar.ts` |

## Keeping the API identical

`schema/java-baseline.graphql` is the schema exported from the running Java server.

```
npm run schema:export -- http://localhost:8080/graphql schema/nest.graphql
npm run schema:diff        # fails on any breaking, dangerous or added change
npm run smoke              # login/ownership checks; also passes against the Java server
```

## Deliberate differences from the Java version

- Error messages are plain (`Not Authorized`) instead of graphql-java's
  `Exception while fetching data (/field) : Not Authorized`, and carry `extensions.code`
  (`UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND`) instead of `classification`.
- `Recipe.author` is many-to-one (Java mapped it as one-to-one).
- `login` with a missing email or password fails instead of matching any author.
- The session cookie is `connect.sid` rather than `JSESSIONID`, and IDs are per-table
  rather than drawn from one shared Hibernate sequence.

Still the same as Java, and worth fixing next: passwords are stored in plain text, and
sessions live in process memory (a single instance only).
