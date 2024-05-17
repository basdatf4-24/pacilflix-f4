import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button } from "~/lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/lib/ui/card";
import { Input } from "~/lib/ui/input";
import { Label } from "~/lib/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/lib/ui/select";
import { COUNTRIES } from "./constant";
import { useState } from "react";
import { type User } from "~/lib/repository/user/type";
import { createUser } from "~/lib/repository/user/user.server";
import type { PostgresError } from "postgres";
import { redirectWithSuccess } from "remix-toast";
import { redirectIfLoggedInLoader } from "~/lib/server/auth.server";

interface ActionInterface {
  error: ErrorInterface;
}

interface ErrorInterface {
  username?: string;
  password?: string;
  confimationPassword?: string;
  country?: string;
}

export const loader = redirectIfLoggedInLoader;

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let username = String(formData.get("username") || "");
  let password = String(formData.get("password") || "");
  let confirmationPassword = String(formData.get("confirm-password") || "");
  let country = String(formData.get("country") || "");
  let error: ErrorInterface = {};

  if (username === "" || !username) {
    error = {
      username: " Username cannot be empty",
    };

    return json(
      {
        error,
      },
      400
    );
  }

  if (password === "" || !password) {
    error = {
      password: "Password cannot be empty",
    };
    return json(
      {
        error,
      },
      400
    );
  }

  if (password.length < 8) {
    error = {
      password: "Password minimum 8 characters",
    };
    return json(
      {
        error,
      },
      400
    );
  }
  if (confirmationPassword === "" || !confirmationPassword) {
    error = {
      confimationPassword: "confirmation password cannot be empty",
    };
    return json(
      {
        error,
      },
      400
    );
  }

  if (country === "" || !country) {
    error = {
      country: "Country cannot be empty",
    };
    return json({ error }, 400);
  }

  if (password !== confirmationPassword) {
    error = {
      confimationPassword: "Confirmation password not match",
    };
    return json(
      {
        error,
      },
      400
    );
  }
  let registered_user: User = {
    username: username as string,
    password: password as string,
    negara_asal: country as string,
  };
  try {
    await createUser(registered_user);
  } catch (e) {
    let postgresError = e as PostgresError;
    if (postgresError.message === `Username ${username} already exist`) {
      error = {
        username: "Username already taken, please use another username",
      };
      return json(
        {
          error,
        },
        400
      );
    }
    return json({}, 400);
  }
  return redirectWithSuccess(
    "/authentication/login",
    "Success register! please login"
  );
}

export default function RegisterPage() {
  const [country, setCountry] = useState<string | undefined>();
  let actionData = useActionData<ActionInterface>();
  return (
    <Card className="w-[40%]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>

      <CardContent className="w-full relative flex flex-col items-center p-4">
        <Form method="POST" className="w-full space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
            />
            {actionData?.error?.username && (
              <p className="text-red-400">{actionData.error.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {actionData?.error?.password && (
              <p className="text-red-400">{actionData?.error?.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmation Password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Re-enter your password"
            />
            {actionData?.error?.confimationPassword && (
              <p className="text-red-400">
                {actionData?.error.confimationPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              name="country"
              defaultValue={country}
              onValueChange={(value) => setCountry(value)}
            >
              <SelectTrigger>{country ?? "Select your country"}</SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country, index) => (
                  <SelectItem value={country.toString()} key={index}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {actionData?.error?.country && (
              <p className="text-red-500">{actionData?.error.country}</p>
            )}
          </div>
          <Button variant="default" className="w-full" type="submit">
            Register
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
