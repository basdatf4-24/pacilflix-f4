import {
  isRouteErrorResponse,
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import "~/styles/tailwind.css";
import "@fontsource/geist-sans";
import { LoaderFunctionArgs } from "@remix-run/node";
import { parseColorScheme } from "~/lib/server/color-scheme.server";
import { ColorSchemeScript, useColorScheme } from "~/lib/helper/theme";
import { cx } from "class-variance-authority";
import Navbar from "~/lib/components/Navbar";
import { canUseDOM } from "~/lib/helper/utils";
import { GlobalLoading } from "./lib/helper/global-loading";

export async function loader({ request }: LoaderFunctionArgs) {
  const colorScheme = await parseColorScheme(request);
  return json({
    colorScheme,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const matches = useMatches();
  const forceDark = matches.some(({ handle }) => {
    if (handle && typeof handle === "object" && "forceDark" in handle) {
      return handle.forceDark;
    }
    return false;
  });
  return (
    <html
      lang="en"
      className={cx({
        dark: forceDark || colorScheme === "dark",
      })}
      data-theme={forceDark ? "dark" : colorScheme}
    >
      <head>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ColorSchemeScript forceConsistentTheme={forceDark} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalLoading />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <div className="z-20" id="nav">
        <Navbar />
      </div>
      <div className="relative z-10 flex flex-grow" id="content">
        <Outlet />
      </div>
      <div className="z-20" id="footer"></div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (!canUseDOM) {
    console.error(error);
  }

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <title>{error.statusText}</title>
        </head>
        <body>
          <div className="flex flex-1 flex-col justify-center text-white">
            <div className="text-center leading-none font-sans">
              <h1 className="text-[25vw]">{error.status}</h1>
              <p className="text-[8vw] underline">{error.statusText}</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Something when wrong</title>
      </head>
      <body>
        <div className="flex flex-1 flex-col justify-center text-white">
          <div className="text-center leading-none">
            <h1 className="font-mono text-[25vw]">Error</h1>
            <p className="font-sans">
              Something went wrong! Please try again later.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
