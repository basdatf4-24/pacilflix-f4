import {
  type LoaderFunctionArgs,
  json,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import {
  deleteFromDaftarFavorit,
  getFavoriteDetail,
} from "~/lib/repository/favorite/favorite.server";
import { getAuthUser } from "~/lib/server/auth.server";
import { Button } from "~/lib/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/ui/table";

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (
    params.timestamp === "" ||
    !params.timestamp ||
    params.timestamp === null
  ) {
    return json({
      error: true,
      username: "",
      favoriteFilms: [],
    });
  }
  let username = await getAuthUser(request);

  let favoriteFilms = await getFavoriteDetail({
    username,
    timestamp: params.timestamp,
  });
  return json({ username, favoriteFilms });
}

export async function action({ request }: ActionFunctionArgs) {
  let form = await request.formData();
  let formObject = Object.fromEntries(form.entries());
  let username = String(formObject.username || "");
  let timestamp = String(formObject.timestamp || "");
  let title = String(formObject.title || "");
  let id = String(formObject.id || "");
  let daftarFavorit = String(formObject.daftarFavorit || "");

  if (
    username === "" ||
    timestamp === "" ||
    title === "" ||
    id === "" ||
    daftarFavorit === ""
  ) {
    return json({ error: true });
  }

  try {
    await deleteFromDaftarFavorit({
      username,
      timestamp,
      idTayangan: id,
    });
  } catch (e) {
    return jsonWithError({}, "Opps! terjadi kesalahan");
  }

  return jsonWithSuccess(
    { success: true },
    `Sukses menghapus ${title} dari ${daftarFavorit} `
  );
}

export default function FavoriteDetailPage() {
  let data = useLoaderData<typeof loader>();
  return (
    <div className="relative flex flex-col w-full px-10 py-10">
      <div className="space-y-6">
        <h1 className="text-2xl">
          {data.favoriteFilms[0]?.judul_daftar_favorit}
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Judul</TableHead>
              <TableHead className="text-center">Waktu dibuat</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.favoriteFilms.map((table, index) => {
              let date = new Date(table?.timestamp);
              let format = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell className=" text-center">{table?.judul}</TableCell>
                  <TableCell className="text-center">{format}</TableCell>
                  <TableCell className=" text-center">
                    <Form method="post">
                      <input
                        type="hidden"
                        value={table?.timestamp}
                        name="timestamp"
                      />
                      <input
                        type="hidden"
                        value={data.username}
                        name="username"
                      />
                      <input type="hidden" value={table?.judul} name="title" />
                      <input
                        type="hidden"
                        value={table?.id_tayangan}
                        name="id"
                      />
                      <input
                        type="hidden"
                        value={table?.judul_daftar_favorit}
                        name="daftarFavorit"
                      />
                      <Button type="submit">Hapus</Button>
                    </Form>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
