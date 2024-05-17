import { type LoaderFunctionArgs } from "@remix-run/node";
import { getAuthUser } from "~/lib/server/auth.server";
import { safeRedirect } from "~/lib/server/http.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  return safeRedirect("/shows");
}
