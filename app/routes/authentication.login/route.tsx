import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/lib/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/lib/ui/card";
import { Input } from "~/lib/ui/input";
import { Label } from "~/lib/ui/label";

export async function loader() {
  return json({});
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  return json({});
}

export default function LoginPage() {
  return (
    <Card className="w-[40%]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent className="w-full relative flex flex-col items-center p-4">
        <Form
          method="POST"
          action="/authentication/login"
          className="w-full flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Entery your username"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Entert your password"
            />
          </div>

          <Button variant="default" className="w-full">
            Login
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
