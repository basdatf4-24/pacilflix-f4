import { type ActionFunctionArgs } from "@remix-run/node";
import { type PostgresError } from "postgres";
import { jsonWithError, jsonWithSuccess, redirectWithError } from "remix-toast";
import { watchShow } from "~/lib/repository/shows/shows.server";
import { getUserFromRequest } from "~/lib/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user) {
    return redirectWithError("Anda tidak memiliki akses", "/shows");
  }

  let username = await getUserFromRequest(request);

  let form = await request.formData();
  let formData = Object.fromEntries(form.entries());

  let watch = parseInt((formData.watch as string) || "0", 10);
  let showId = String(formData.showId || "");
  let showDuration = parseInt((formData.showDuration as string) || "0", 10);
  if (!showId) {
    return jsonWithError({ error: true }, "Tayangan tidak ditemukan");
  }

  if (watch <= 0) {
    return jsonWithError(
      { error: true },
      "Opps! kamu belum menonton tayanagan ini"
    );
  }

  if (showDuration <= 0) {
    return jsonWithError(
      { error: true },
      "Opps! kamu belum menonton tayanagan ini"
    );
  }

  let duration = Math.floor((watch / 100) * showDuration);

  try {
    await watchShow({
      showId,
      username,
      duration,
    });

    return jsonWithSuccess(
      { success: true },
      `Success menonton tayangan selama ${duration} menit`
    );
  } catch (e) {
    let err = e as PostgresError;
    return jsonWithError({ error: true }, err.message);
  }
}
