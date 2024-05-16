import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { redirectWithSuccess } from "remix-toast";
import { findUserByUsername } from "~/lib/repository/user/user.server";
import {
  commitSession,
  getSession,
  redirectIfLoggedInLoader,
} from "~/lib/server/auth.server";
import { Button } from "~/lib/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/lib/ui/card";
import { Input } from "~/lib/ui/input";
import { Label } from "~/lib/ui/label";

interface ActionInterface {
  error: ErrorInterface;
}

interface ErrorInterface {
  global?: string;
  username?: string;
  password?: string;
}

export const loader = redirectIfLoggedInLoader;

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let url_params = new URL(request.url);
  let params = Object.fromEntries(url_params.searchParams.entries()) as {
    redirect: string | undefined;
  };
  let redirect_params = params.redirect || "/";
  const formData = await request.formData();
  let username = String(formData.get("username") || "");
  let password = String(formData.get("password") || "");
  let error: ErrorInterface = {};
  if (username === "") {
    error = {
      username: "Please input username",
    };
    return json({ error }, 400);
  }

  if (password === "") {
    error = {
      password: "Please input password",
    };
    return json({ error }, 400);
  }
  let user = await findUserByUsername(username as string);
  if (password !== user?.password) {
    error = {
      global: "Incorrect username or password",
    };
    return json(
      {
        error,
      },
      400
    );
  }

  session.set("username", user.username);

  return redirectWithSuccess(redirect_params, "Success Login!", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginPage() {
  let actionData = useActionData<ActionInterface>();

  return (
    <Card className="w-[40%]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent className="w-full relative flex flex-col items-center p-4">
        <Form method="POST" className="w-full space-y-6">
          <div className="space-y-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Entery your username"
            />

            {actionData?.error?.username && (
              <p className="text-red-400">{actionData.error.username}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="username">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Entert your password"
            />
            {actionData?.error?.password && (
              <p className="text-red-400">{actionData.error.password}</p>
            )}
          </div>

          {actionData?.error?.global && (
            <p className="text-red-400">{actionData.error.global}</p>
          )}

          <Button variant="default" className="w-full">
            Login
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
