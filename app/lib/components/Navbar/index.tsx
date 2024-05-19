import {
  Link,
  NavLink,
  useFetcher,
  useLocation,
  useRouteLoaderData,
} from "@remix-run/react";
import type { loader as rootLoader } from "~/root";
import { SunMoon } from "lucide-react";
import { Button } from "~/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/lib/ui/dropdown-menu";

export default function Navbar() {
  const location = useLocation();
  const fetcher = useFetcher();
  let rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  let navbar: {
    title: string;
    url: string;
  }[] = [];

  if (!rootLoaderData?.user) {
    navbar = [
      {
        title: "Trailer",
        url: "/trailer",
      },
    ];
  } else {
    navbar = [
      { title: "Daftar Tayangan", url: "/" },
      { title: "Daftar Kontributor", url: "/contributors" },
      { title: "Daftar Favorit", url: "/shows/favorite" },
      { title: "Daftar Unduhan", url: "/shows/downloaded" },
      { title: "Kelola Langganan", url: "/subscribe" },
    ];
  }
  return (
    <nav className="px-10 py-3 flex items-center justify-between fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-row gap-8">
        <Link to="/">
          <p className="text-lg font-semibold">Pacilflix</p>
        </Link>

        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SunMoon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <fetcher.Form
                preventScrollReset
                action="/_actions/color-scheme"
                method="post"
              >
                <input
                  type="hidden"
                  name="returnTo"
                  value={location.pathname + location.search}
                />
                <DropdownMenuItem>
                  <input
                    className="w-full text-left"
                    type="submit"
                    value="light"
                    name="colorScheme"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <input
                    className="w-full text-left"
                    type="submit"
                    value="dark"
                    name="colorScheme"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <input
                    className="w-full text-left"
                    type="submit"
                    value="system"
                    name="colorScheme"
                  />
                </DropdownMenuItem>
              </fetcher.Form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-center items-center gap-5">
          {navbar.map((items, index) => (
            <NavLink
              to={items.url}
              key={index}
              className="transition-colors text-foreground/60 text-sm  hover:text-foreground/80"
            >
              {items.title}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        {!rootLoaderData?.user ? (
          <NavLink to="/authentication">
            <Button size="sm">Login</Button>
          </NavLink>
        ) : (
          <NavLink to="/authentication/logout">
            <Button size="sm">Logout</Button>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
