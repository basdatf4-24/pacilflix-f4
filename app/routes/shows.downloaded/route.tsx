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
import {
  deleteDownloadedShows,
  getDownloadedShows,
} from "~/lib/repository/download/download.server";
import { Form, useLoaderData } from "@remix-run/react";
import { jsonWithError, jsonWithSuccess } from "remix-toast";

export async function loader({ request }: LoaderFunctionArgs) {
  let username = await getAuthUser(request);
  let downloaded_shows = await getDownloadedShows({ username });
  return json({ username, downloaded_shows });
}

export async function action({ request }: ActionFunctionArgs) {
  let form = await request.formData();
  let downloadedId = String(form.get("downloadId") || "");
  let username = String(form.get("username") || "");
  let timestamp = String(form.get("timestamp") || "");

  let title = String(form.get("title") || "");

  if (
    downloadedId === "" ||
    username === "" ||
    timestamp === "" ||
    title === ""
  ) {
    return json({
      error: true,
    });
  }

  try {
    await deleteDownloadedShows({
      id: downloadedId,
      username,
      timestamp,
    });
    return jsonWithSuccess({}, `Sukses menghapus film ${title} `);
  } catch (e) {
    return jsonWithError(
      {},
      "Opps! gagal menghapus, kamu harus menunggu 24 jam untuk menghapus"
    );
  }
}

export default function ListDownloadPage() {
  let data = useLoaderData<typeof loader>();
  return (
    <div className="relative flex flex-col w-full px-10 py-10">
      <div className="space-y-6">
        <h1 className="text-2xl">Daftar Unduhan</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Judul</TableHead>
              <TableHead className="text-center">Waktu Diunduh</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.downloaded_shows.map((table, index) => {
              let date = new Date(table.timestamp);
              let format = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell className=" text-center">{table.judul}</TableCell>
                  <TableCell className="text-center">{format}</TableCell>
                  <TableCell className=" text-center">
                    <Form method="post">
                      <input type="hidden" value={table.id} name="downloadId" />
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
