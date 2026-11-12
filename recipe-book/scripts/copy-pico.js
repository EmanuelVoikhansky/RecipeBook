// Pico CSS uses modern selectors (:is, :where, :has) that the PostCSS 7 pipeline
// in react-scripts 4 can't parse, so it can't be imported from JS. Instead we copy
// the stylesheet into public/ and load it with a <link> tag in public/index.html.
// Runs automatically before `npm start` and `npm run build`.
const fs = require("fs");
const path = require("path");

const source = require.resolve("@picocss/pico/css/pico.min.css");
const target = path.join(__dirname, "..", "public", "pico.min.css");
fs.copyFileSync(source, target);
