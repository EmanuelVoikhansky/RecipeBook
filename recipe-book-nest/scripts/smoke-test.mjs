// End-to-end behaviour check that runs unchanged against either backend, so the
// Java server's answers act as the expected output for the Nest port.
// Usage: node scripts/smoke-test.mjs [endpoint]   (default http://localhost:8080/graphql)
const endpoint = process.argv[2] ?? 'http://localhost:8080/graphql';

let cookie = '';
async function gql(query, variables = {}, { token, sendCookie = true } = {}) {
  const headers = { 'content-type': 'application/json' };
  if (token) headers.token = token;
  if (sendCookie && cookie) headers.cookie = cookie;
  const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ query, variables }) });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie && sendCookie) cookie = setCookie.split(';')[0];
  return res.json();
}

let failures = 0;
function check(name, ok, detail) {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail === undefined ? '' : `  -> ${JSON.stringify(detail)}`}`);
}
// graphql-java (the Java server) prefixes resolver errors with
// "Exception while fetching data (/field) : "; compare only the message itself.
const errorOf = (r) => r.errors?.[0]?.message?.replace(/^Exception while fetching data \([^)]*\) : /, '');

const RECIPE = 'id name stars imageUrl instructions author { id name profilePicUrl }';

const all = await gql(`{ all_recipes { ${RECIPE} } }`);
const recipes = all.data?.all_recipes ?? [];
check('all_recipes returns the 5 seeded recipes', recipes.length === 5, recipes.map((r) => r.name));
const haggis = recipes.find((r) => r.name === 'Haggis');
const roastBeef = recipes.find((r) => r.name === 'Roast Beef');
check('recipes carry their author', haggis?.author?.name === 'Rordon Gamsey' && roastBeef?.author?.name === 'Paul Holly');

const one = await gql(`query($id: Long) { recipe(id: $id) { name } }`, { id: roastBeef?.id });
check('recipe(id) finds a recipe', one.data?.recipe?.name === 'Roast Beef', one.data);
const missing = await gql(`query($id: Long) { recipe(id: $id) { name } }`, { id: 999999 });
check('recipe(id) for an unknown id is null', missing.data?.recipe === null && !missing.errors, missing);

const draft = { name: 'Toast', stars: 4.5, instructions: 'Heat bread', imageUrl: null };
const SAVE = `mutation($recipe: RecipeDraftInput, $id: Long) { saveRecipe(recipe: $recipe, id: $id) { ${RECIPE} } }`;

const anon = await gql(SAVE, { recipe: draft });
check('saveRecipe without login is rejected', errorOf(anon) === 'Not Authorized', errorOf(anon));

const badLogin = await gql(`mutation { login(email: "paul.holly@gmail.com", password: "nope") { token } }`);
check('login with a wrong password fails', errorOf(badLogin) === 'Invalid login', errorOf(badLogin));

const login = await gql(
  `mutation { login(email: "paul.holly@gmail.com", password: "handshake") { token account { id name profilePicUrl } } }`,
);
const token = login.data?.login?.token;
check('login returns a token and the account', !!token && login.data.login.account.name === 'Paul Holly', login.data);
check('login sets a session cookie', !!cookie, cookie.split('=')[0]);

const noCookie = await gql(SAVE, { recipe: draft }, { token, sendCookie: false });
check('token header without the session cookie is rejected', errorOf(noCookie) === 'Not Authorized', errorOf(noCookie));
const wrongToken = await gql(SAVE, { recipe: draft }, { token: 'not-the-token' });
check('session cookie with a wrong token is rejected', errorOf(wrongToken) === 'Not Authorized', errorOf(wrongToken));

const created = await gql(SAVE, { recipe: draft }, { token });
const toast = created.data?.saveRecipe;
check(
  'saveRecipe creates a recipe owned by the caller',
  toast?.name === 'Toast' && toast.stars === 4.5 && toast.author?.name === 'Paul Holly',
  created.errors ?? toast,
);

const updated = await gql(SAVE, { recipe: { ...draft, name: 'Better toast' }, id: toast?.id }, { token });
check(
  'saveRecipe updates an owned recipe in place',
  updated.data?.saveRecipe?.id === toast?.id && updated.data.saveRecipe.name === 'Better toast',
  updated.errors ?? updated.data,
);

const stolen = await gql(SAVE, { recipe: draft, id: haggis?.id }, { token });
check('saveRecipe on someone else\'s recipe is rejected', errorOf(stolen) === 'You can only edit recipes you own', errorOf(stolen));

const DELETE = `mutation($id: Long) { deleteRecipe(id: $id) }`;
const delOther = await gql(DELETE, { id: haggis?.id }, { token });
check('deleteRecipe on someone else\'s recipe is rejected', errorOf(delOther) === 'You can only delete recipes you own', errorOf(delOther));
const delMissing = await gql(DELETE, { id: 999999 }, { token });
check('deleteRecipe on an unknown id reports Not found', errorOf(delMissing) === 'Not found', errorOf(delMissing));
const delOwn = await gql(DELETE, { id: toast?.id }, { token });
check('deleteRecipe on an owned recipe returns true', delOwn.data?.deleteRecipe === true, delOwn.errors ?? delOwn.data);

const after = await gql(`{ all_recipes { name } }`);
check('deleted recipe is gone', after.data?.all_recipes?.length === 5, after.data?.all_recipes?.map((r) => r.name));

console.log(failures ? `\n${failures} check(s) failed against ${endpoint}` : `\nall checks passed against ${endpoint}`);
process.exit(failures ? 1 : 0);
