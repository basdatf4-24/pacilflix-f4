import { Outlet } from "@remix-run/react";

export default function AuthenticationPage() {
  return (
    <div className="relative flex flex-col w-full px-10 py-5 items-center">
      <div className="flex flex-col w-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
