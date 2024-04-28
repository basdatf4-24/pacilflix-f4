import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
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
import { ClientOnly } from "remix-utils/client-only";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/lib/ui/select";
import { COUNTRIES } from "./constant";
import { useState } from "react";

export async function loader() {
  return json({});
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmationPassword = formData.get("confirm-password");
  const country = formData.get("country");
  console.log(username, password, confirmationPassword, country);
  return json({});
}

export default function RegisterPage() {
  const [country, setCountry] = useState<string>();
  return (
    <Card className="w-[40%]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>

      <CardContent className="w-full relative flex flex-col items-center p-4">
        <Form
          method="POST"
          action="/authentication/register"
          className="w-full flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="confirm-password">Confirmation Password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Re-enter your password"
            />
          </div>

          <div className="flex flex-col gap-4">
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
          </div>
          <Button variant="default" className="w-full" type="submit">
            Register
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
