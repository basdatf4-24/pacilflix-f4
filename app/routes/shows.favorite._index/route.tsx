import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/lib/ui/table";
import { Button } from "~/lib/ui/button";
import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { getAuthUser } from "~/lib/server/auth.server";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import {
  deleteFavorite,
  getListFavorite,
} from "~/lib/repository/favorite/favorite.server";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/lib/ui/dialog";
import { Input } from "~/lib/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
export async function loader({ request }: LoaderFunctionArgs) {
  let username = await getAuthUser(request);
  let listFavorite = await getListFavorite({ username });
  return json({ username, listFavorite });
}

export async function action({ request }: ActionFunctionArgs) {
  let form = await request.formData();
  let username = String(form.get("username") || "");
  let timestamp = String(form.get("timestamp") || "");
  let title = String(form.get("title") || "");
  if (username === "" || timestamp === "" || title === "") {
    return json({ error: true });
  }

  try {
    await deleteFavorite({
      username,
      timestamp,
    });
  } catch (error) {
    return jsonWithError({}, "Opps! terjadi kesalahan");
  }
  return jsonWithSuccess({}, `Sukses menghapus ${title} dari daftar favorit`);
}

export default function ListFavoritePage() {
  let fetcher = useFetcher();
  let data = useLoaderData<typeof loader>();
  return (
    <div className="relative flex flex-col w-full px-10 py-10">
      <div className="space-y-6">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl">Daftar Favorit</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" type="button">
                Buat daftar favorit
              </Button>
            </DialogTrigger>
            <DialogContent className="space-y-6">
              <DialogHeader>
                <h2 className="text-xl text-center">Buat daftar favorit</h2>
              </DialogHeader>
              <fetcher.Form
                method="post"
                action="/_actions/favorite"
                className="w-full space-y-4"
              >
                <div className="w-full space-y-4">
                  <Input
                    placeholder="Judul daftar Favorit"
                    type="text"
                    name="title"
                  />
                </div>

                <div className="w-full space-x-4">
                  <DialogClose asChild>
                    <Button type="submit">Buat</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogClose>
                </div>
              </fetcher.Form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Judul</TableHead>
              <TableHead className="text-center">Waktu dibuat</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.listFavorite.map((table, index) => {
              let date = new Date(table.timestamp);
              let format = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell className=" text-center">
                    <Link to={`/shows/favorite/${table.timestamp}`}>
                      <p className="text-blue-600 dark:text-blue-400  underline">
                        {table.judul}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{format}</TableCell>
                  <TableCell className=" text-center">
                    <fetcher.Form method="post">
                      <input
                        type="hidden"
                        value={table.timestamp}
                        name="timestamp"
                      />
                      <input
                        type="hidden"
                        value={data.username}
                        name="username"
                      />
                      <input type="hidden" value={table.judul} name="title" />
                      <Button type="submit">Hapus</Button>
                    </fetcher.Form>
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
