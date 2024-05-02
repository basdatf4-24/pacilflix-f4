import { Link, NavLink, useFetcher, useLocation } from "@remix-run/react";
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
  return (
    <nav className="px-10 py-3 flex items-center justify-between sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        <div className="flex items-center justify-center">
          <div className="flex gap-4">
            <NavLink
              to="/tayangan"
              className="transition-colors text-foreground/60 hover:text-foreground/80"
            >
              Trailer
            </NavLink>

          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <NavLink to="/authentication">
          <Button>Login</Button>
        </NavLink>
      </div>
    </nav>
  );
}
