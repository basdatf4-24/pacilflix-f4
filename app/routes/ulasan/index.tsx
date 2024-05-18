// import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
// import { Form, useLoaderData } from "@remix-run/react";
// import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";
// import { Input } from "~/lib/ui/input";
// import { Label } from "~/lib/ui/label";
// import { createUlasan, getUlasanByTayangan } from "~/lib/repository/ulasan/ulasan.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   let redirect = await getAuthUser(request);
//   if (redirect) {
//     return redirect;
//   }
//   let username = await getUserFromRequest(request);
//   let tayanganId = new URL(request.url).searchParams.get("id");

//   if (!tayanganId) {
//     return json({ error: "Tayangan ID tidak ditemukan" }, 404);
//   }

//   const ulasanData = await getUlasanByTayangan({ idTayangan: tayanganId });

//   return {
//     username,
//     tayanganId,
//     ulasanData
//   };
// }

// export async function action({ request }: ActionFunctionArgs) {
//     let redirect = await getAuthUser(request);
//     if (redirect) return redirect;
//     let username = await getUserFromRequest(request);
  
//     let form = await request.formData();
//     let idTayangan = String(form.get("Id tayangan") || )
// }

