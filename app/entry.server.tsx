import * as Sentry from "@sentry/remix";
import { renderToString } from "react-dom/server";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";

Sentry.init({
  dsn: "https://b8b7ee083c22440c8496166ddf09eb8f:f4e336e25da047929b539722176b43c5@o4504216278269952.ingest.sentry.io/4504216280301568",
  tracesSampleRate: 1,
  integrations: [],
  debug: process.env.NODE_ENV !== "production",
});

export default function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  headers.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, { status, headers });
}
