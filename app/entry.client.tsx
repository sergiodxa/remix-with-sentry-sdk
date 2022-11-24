import * as Sentry from "@sentry/remix";
import { useEffect } from "react";
import { hydrate } from "react-dom";
import { RemixBrowser, useLocation, useMatches } from "remix";

Sentry.init({
  dsn: "https://b8b7ee083c22440c8496166ddf09eb8f:f4e336e25da047929b539722176b43c5@o4504216278269952.ingest.sentry.io/4504216280301568",
  tracesSampleRate: 1,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches
      ),
    }),
  ],
  attachStacktrace: true,
  debug: process.env.NODE_ENV === "development",
});

hydrate(<RemixBrowser />, document.body);
