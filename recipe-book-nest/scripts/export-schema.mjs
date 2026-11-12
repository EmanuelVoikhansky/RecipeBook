// Prints the SDL of a running GraphQL server via introspection.
// Usage: node scripts/export-schema.mjs [endpoint] [outFile]
//   defaults: http://localhost:8080/graphql -> stdout
import { writeFileSync } from 'node:fs';
import { buildClientSchema, getIntrospectionQuery, lexicographicSortSchema, printSchema } from 'graphql';

const [endpoint = 'http://localhost:8080/graphql', outFile] = process.argv.slice(2);

const res = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ query: getIntrospectionQuery() }),
});
const body = await res.json();
if (body.errors) {
  console.error(JSON.stringify(body.errors, null, 2));
  process.exit(1);
}

// Sorted so two servers that declare things in a different order still diff cleanly.
const sdl = printSchema(lexicographicSortSchema(buildClientSchema(body.data))) + '\n';
if (outFile) {
  writeFileSync(outFile, sdl);
  console.log(`wrote ${outFile}`);
} else {
  process.stdout.write(sdl);
}
