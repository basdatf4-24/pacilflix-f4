import { type LoaderFunctionArgs } from "@remix-run/node";

export function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Index() {
  return (
    <div>
      <h1>Index Page</h1>
    </div>
  );
}
