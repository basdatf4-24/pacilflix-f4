import { type ActionFunctionArgs, json } from "@remix-run/node";
import { type PostgresError } from "postgres";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { createFavorite } from "~/lib/repository/favorite/favorite.server";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  let username = await getUserFromRequest(request);

  let form = await request.formData();

  let title = String(form.get("title") || "");

  if (title === "") {
    return json({ success: true });
  }

  try {
    await createFavorite({
      username,
      title,
    });
    return jsonWithSuccess({ success: true }, "Sukses membuat daftar favorit");
  } catch (error) {
    let pgerror = error as PostgresError;
    return jsonWithError({ success: false }, pgerror.message);
  }
}
