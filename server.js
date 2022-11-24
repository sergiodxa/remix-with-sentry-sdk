const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");
const { wrapExpressCreateRequestHandler } = require("@sentry/remix");

const BUILD_DIR = path.join(process.cwd(), "build");

const app = express();

const createSentryRequestHandler =
  wrapExpressCreateRequestHandler(createRequestHandler);

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.all("*", remixHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function remixHandler(req, res, next) {
  // In development, we purge the require cache on every request so it's always
  // up to date and then require again and handle the reques
  if (process.env.NODE_ENV === "development") {
    for (let key in require.cache) {
      if (key.startsWith(BUILD_DIR)) {
        delete require.cache[key];
      }
    }
  }

  return createSentryRequestHandler({
    build: require("./build"),
    mode: process.env.NODE_ENV,
  })(req, res, next);
}
