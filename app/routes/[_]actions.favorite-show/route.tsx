import { type ActionFunctionArgs } from "@remix-run/node";
import { type PostgresError } from "postgres";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { addFavoriteToFavoriteList } from "~/lib/repository/favorite/favorite.server";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  let username = await getUserFromRequest(request);
  let formData = await request.formData();
  let formObj = Object.fromEntries(formData.entries());

  let showId = String(formObj.showId || "");
  let timestamp = String(formObj.timestamp || "");
  let showTitle = String(formObj.showTitle || "");

  if (!showId || !timestamp || !showTitle) {
    return jsonWithError({ success: false }, "Opps! terjadi kesalahan");
  }

  try {
    await addFavoriteToFavoriteList({
      showId,
      username,
      timestamp,
    });

    return jsonWithSuccess(
      { success: true },
      `Sukses menambahkan ${showTitle} ke daftar favorit`
    );
  } catch (e) {
    let err = e as PostgresError;
    return jsonWithError({ success: false }, err.message);
  }
}
