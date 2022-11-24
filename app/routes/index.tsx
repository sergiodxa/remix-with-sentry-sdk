import { ActionFunction, Form } from "remix";

export const action: ActionFunction = async () => {
  throw new Error("Sentry Error");
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>

      <button
        type="button"
        onClick={() => {
          throw new Error("Sentry Frontend Error");
        }}
      >
        Throw error
      </button>

      <Form method="post">
        <button type="submit">Throw error on Action</button>
      </Form>
    </div>
  );
}
