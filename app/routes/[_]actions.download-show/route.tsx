import { type ActionFunctionArgs } from "@remix-run/node";
import type { PostgresError } from "postgres";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { addDownloadShow } from "~/lib/repository/download/download.server";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  let username = await getUserFromRequest(request);
  let formData = await request.formData();
  let formObj = Object.fromEntries(formData.entries());

  let showId = String(formObj.showId || "");
  let showTitle = String(formObj.showTitle || "");

  if (!showId) {
    return null;
  }

  let timestamp = new Date().toISOString();

  try {
    await addDownloadShow({
      showId,
      username,
      timestamp,
    });

    return jsonWithSuccess(
      { success: true },
      `Success menambahkan ${showTitle} ke daftar download`
    );
  } catch (e) {
    let err = e as PostgresError;
    return jsonWithError({ error: true }, err.message);
  }
}
