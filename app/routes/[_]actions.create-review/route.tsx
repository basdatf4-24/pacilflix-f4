import { ActionFunctionArgs } from "@remix-run/node";
import { PostgresError } from "postgres";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { createUlasan } from "~/lib/repository/ulasan/ulasan.server";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  let username = await getUserFromRequest(request);

  let formData = await request.formData();

  let formObj = Object.fromEntries(formData.entries());

  let rating = Number(formObj.rating || 0);
  let description = String(formObj.description || "");

  let showId = String(formObj.showId || "");

  if (!showId) {
    return jsonWithError({ success: false }, "Show ID tidak boleh kosong");
  }

  if (!rating) {
    return jsonWithError({ success: false }, "Rating tidak boleh kosong");
  }

  try {
    await createUlasan({
      username,
      idTayangan: showId,
      rating,
      deskripsi: description,
    });

    return jsonWithSuccess(
      { success: true },
      "Ulasan berhasil ditambahkan, terima kasih!"
    );
  } catch (e) {
    let err = e as PostgresError;
    return jsonWithError({ success: false }, err.message);
  }
  return null;
}
