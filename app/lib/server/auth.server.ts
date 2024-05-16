import {
  LoaderFunctionArgs,
  createCookieSessionStorage,
} from "@remix-run/node";
import { redirectWithError } from "remix-toast";
import { safeRedirect } from "./http.server";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
  console.warn(
    "🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production."
  );
  secret = "default-secret";
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: "__session",
      secrets: [secret],
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  });

export async function getAuthUser(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("username")) {
    session.unset("username");
    return redirectWithError("/login", "Opps! you are not logged in", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export async function getUserFromRequest(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  let username = session.get("username") as string | null;
  return username;
}

export async function redirectIfLoggedInLoader({
  request,
}: LoaderFunctionArgs) {
  let username = await getUserFromRequest(request);
  if (username) {
    throw safeRedirect("/home");
  }
  return null;
}

export { getSession, commitSession, destroySession };
