import { Link, useFetcher, useRouteLoaderData } from "@remix-run/react";
import type { loader as showsLoader } from "./route";
import { Button } from "~/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/lib/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/lib/ui/select";
import Ulasan from "./Ulasan";
export default function SeriesPage() {
  let data = useRouteLoaderData<typeof showsLoader>(
    "routes/shows.watch.$showId._index"
  );

  let pemain = data?.contributors.filter((items) => {
    return items.role === "PEMAIN";
  });

  let penulisSkenario = data?.contributors.filter((items) => {
    return items.role === "PENULIS_SKENARIO";
  });

  let fetcher = useFetcher();

  return (
    <div className="w-full flex flex-col space-y-8 px-10 py-10">
      <h1 className="text-2xl text-center font-semibold">Halaman Series</h1>

      <p className="text-xl">Judul : {data?.show.judul}</p>
      <div className="flex flex-col space-y-8">
        <p>Episode:</p>
        <div className="space-y-2 flex flex-col">
          {data?.episode.map((item, index) => {
            return (
              <Link
                to={`/shows/watch/${data?.show.id}/${item.sub_judul}`}
                key={index}
              >
                <Button variant="ghost">
                  Episode {index + 1} - {item.sub_judul}
                </Button>
              </Link>
            );
          })}
        </div>

        <Button className="w-[200px]">Unduh tayangan</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-[200px]" type="button">
              Tambah ke daftar favorit
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader className="font-bold">
              Tambah ke daftar favorit
            </DialogHeader>
            <div className="space-y-4">
              <fetcher.Form
                method="post"
                action="/_actions/favorite-show"
                className="space-y-6"
              >
                <Select name="timestamp">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih daftar favorit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {data?.favoriteList.map((curr, index) => (
                        <SelectItem value={curr.timestamp} key={index}>
                          {curr.judul}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input type="hidden" name="showId" value={data?.showId} />
                <input
                  type="hidden"
                  name="showTitle"
                  value={data?.show.judul}
                />
                <Button type="submit">Tambah</Button>
              </fetcher.Form>
            </div>
          </DialogContent>
        </Dialog>
        <p>Total view: {data?.showCount?.count}</p>
        <p>Rating rata-rata: {parseFloat(data?.showRating.avg).toFixed(2)}</p>
        <div>
          <p>Sinopsis : {data?.show?.sinopsis}</p>
        </div>

        <div>
          <p>Genre:</p>
          <ul>
            {data?.genres.map((item, index) => {
              return <li key={index}>{item.genre}</li>;
            })}
          </ul>
        </div>

        <p>Asal negara: {data?.show.asal_negara}</p>

        <div>
          <p>Pemain:</p>
          <ul>
            {pemain?.map((item, index) => {
              return <li key={index}>{item.nama}</li>;
            })}
          </ul>
        </div>
      </div>

      <div>
        <p>Penulis Skenario:</p>
        <ul>
          {penulisSkenario?.map((item, index) => {
            return <li key={index}>{item.nama}</li>;
          })}
        </ul>
      </div>
      <p>Sutradara: {data?.show.sutradara}</p>
      <Ulasan />
    </div>
  );
}
