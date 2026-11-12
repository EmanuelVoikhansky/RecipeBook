// Compares two SDL files and fails if a client of the first would notice the second.
// Usage: node scripts/diff-schema.mjs [baseline.graphql] [candidate.graphql]
//   defaults: schema/java-baseline.graphql vs schema/nest.graphql
import { readFileSync } from 'node:fs';
import { buildSchema, findBreakingChanges, findDangerousChanges, isScalarType } from 'graphql';

const [baselineFile = 'schema/java-baseline.graphql', candidateFile = 'schema/nest.graphql'] = process.argv.slice(2);

// SPQR registers an unused placeholder scalar; its own description says to strip it from SDL.
const IGNORED_TYPES = new Set(['UNREPRESENTABLE']);
const load = (file) => buildSchema(readFileSync(file, 'utf8'));
const baseline = load(baselineFile);
const candidate = load(candidateFile);
const relevant = (c) => !IGNORED_TYPES.has(c.description.split(' ')[0]);

const removedOrChanged = findBreakingChanges(baseline, candidate).filter(relevant);
const dangerous = findDangerousChanges(baseline, candidate).filter(relevant);
// Reverse direction: anything the candidate has that the baseline lacks.
const added = findBreakingChanges(candidate, baseline).filter(relevant);

// Descriptions are not part of the contract, but report drift so it is a deliberate choice.
const describe = (schema) => {
  const out = new Map();
  for (const type of Object.values(schema.getTypeMap())) {
    if (type.name.startsWith('__') || IGNORED_TYPES.has(type.name)) continue;
    out.set(type.name, type.description ?? '');
    if (isScalarType(type) || !('getFields' in type)) continue;
    for (const field of Object.values(type.getFields())) out.set(`${type.name}.${field.name}`, field.description ?? '');
  }
  return out;
};
const before = describe(baseline);
const after = describe(candidate);
const descriptionDrift = [...before].filter(([k, v]) => after.has(k) && (after.get(k) || '') !== (v || ''));

const section = (title, items, fmt) => {
  console.log(`${title}: ${items.length ? '' : 'none'}`);
  for (const item of items) console.log(`  - ${fmt(item)}`);
};
section('Breaking for existing clients', removedOrChanged, (c) => `${c.type}: ${c.description}`);
section('Potentially dangerous', dangerous, (c) => `${c.type}: ${c.description}`);
section('New or stricter in candidate', added, (c) => `${c.description.replace('was removed', 'is new')} (read in reverse)`);
section('Description differences (informational)', descriptionDrift, ([k, v]) => `${k}: ${JSON.stringify(v)} -> ${JSON.stringify(after.get(k))}`);

const failed = removedOrChanged.length + dangerous.length + added.length;
console.log(failed ? `\nschemas differ (${failed} change(s))` : '\nAPI-compatible: same types, fields, arguments and nullability');
process.exit(failed ? 1 : 0);
