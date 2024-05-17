import { type ActionFunctionArgs, json } from "@remix-run/node";
import { PostgresError } from "postgres";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { createFavorite } from "~/lib/repository/favorite/favorite.server";
import { getAuthUser } from "~/lib/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  let username = await getAuthUser(request);
  let form = await request.formData();

  let title = String(form.get("title") || "");

  if (title === "") {
    return json({ error: true, username: username });
  }

  try {
    let res = await createFavorite({
      username,
      title,
    });
    return jsonWithSuccess(
      { username, title: res.title },
      "Sukses menambahkan ke favorit"
    );
  } catch (error) {
    let pgerror = error as PostgresError;
    return jsonWithError({ error: true }, pgerror.message);
  }
}