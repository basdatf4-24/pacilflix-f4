import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { redirectWithInfo } from "remix-toast";
import {
  destroySession,
  getAuthUser,
  getSession,
} from "~/lib/server/auth.server";
import { Button } from "~/lib/ui/button";
import { Card, CardContent } from "~/lib/ui/card";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirectWithInfo("/authentication", "Success logout! see you again", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  await getAuthUser(request);
  return json({});
}

export default function LogoutPage() {
  return (
    <Card className="w-[40%]">
      <CardContent className="w-full space-y-6 flex  flex-col items-center justify-center p-4 min-h-[200px]">
        <p className="text-xl font-semibold">Are you sure want to logout?</p>
        <Form method="post">
          <Button variant="destructive" type="submit" className="px-10">
            Yes
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
