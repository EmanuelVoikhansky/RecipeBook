import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

function toLong(value: unknown): number {
  const n = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  if (typeof n !== 'number' || !Number.isSafeInteger(n)) {
    throw new GraphQLError(`Long cannot represent ${JSON.stringify(value)}`);
  }
  return n;
}

/**
 * Same name and description as the `Long` scalar SPQR generated for java.lang.Long,
 * so existing queries that declare `$id: Long` keep working. Backed by a JS number,
 * which is exact up to 2^53 - 1; IDs beyond that would need a bigint/string scalar.
 */
export const GraphQLLong = new GraphQLScalarType<number, number>({
  name: 'Long',
  description: 'Long type',
  serialize: toLong,
  parseValue: toLong,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) return toLong(ast.value);
    throw new GraphQLError(`Long cannot represent a ${ast.kind} literal`);
  },
});
