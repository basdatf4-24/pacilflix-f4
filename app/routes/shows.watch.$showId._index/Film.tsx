import { Link, useFetcher, useRouteLoaderData } from "@remix-run/react";
import type { loader as showsLoader } from "./route";
import { Button } from "~/lib/ui/button";
import { Slider } from "~/lib/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/lib/ui/dialog";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/lib/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import Ulasan from "./Ulasan";
export default function FilmPage() {
  const fetcher = useFetcher();
  let data = useRouteLoaderData<typeof showsLoader>(
    "routes/shows.watch.$showId._index"
  );

  let pemain = data?.contributors.filter((items) => {
    return items.role === "PEMAIN";
  });

  let penulisSkenario = data?.contributors.filter((items) => {
    return items.role === "PENULIS_SKENARIO";
  });

  let now = new Date();
  let sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  let sevenDaysFromNowString = `${sevenDaysFromNow.getFullYear()}-${
    sevenDaysFromNow.getMonth() + 1
  }-${sevenDaysFromNow.getDate()}`;

  return (
    <div className="w-full flex flex-col space-y-8 px-10 py-10">
      <h1 className="text-2xl text-center font-semibold">Halaman Film</h1>

      <p className="text-xl">Judul : {data?.show.judul}</p>
      <div className="flex flex-col space-y-8">
        <fetcher.Form
          method="post"
          action="/_actions/watch"
          className="space-y-8"
        >
          <Slider defaultValue={[0]} min={0} max={100} step={1} name="watch" />
          <input type="hidden" name="showId" value={data?.showId} />
          <input
            type="hidden"
            name="showDuration"
            value={data?.show?.durasi_film}
          />
          <Button className="w-[200px]">Tonton sekarang</Button>
        </fetcher.Form>

        <fetcher.Form method="post" action="/_actions/download-show">
          <input type="hidden" name="showId" value={data?.showId} />
          <Dialog>
            <DialogTrigger asChild>
              <Button type="submit" className="w-[200px]">
                Unduh tayangan
              </Button>
            </DialogTrigger>
            <DialogContent className="space-y-4">
              <DialogHeader>
                <DialogTitle>
                  Sukses menambahkan tayangan ke daftar unduhan
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-10">
                <p>
                  Selamat! Anda telah berhasil mengunduh {data?.show.judul} dan
                  akan berlaku hingga {sevenDaysFromNowString}. Cek informasi
                  selengkapnya pada halaman daftar unduhan.
                </p>
                <Link to="/shows/downloaded">
                  <Button>Daftar unduhan</Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </fetcher.Form>
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
                <DialogClose asChild>
                  <Button type="submit">Tambah</Button>
                </DialogClose>
              </fetcher.Form>
            </div>
          </DialogContent>
        </Dialog>

        <p>Total view: {data?.showCount?.count}</p>
        <p>Rating rata-rata: {parseFloat(data?.showRating.avg).toFixed(2)}</p>
        <p>Sinopsis : {data?.show?.sinopsis}</p>
        <p>Durasi film : {data?.show?.durasi_film} menit</p>
        <p className="text-blue-500 ">
          URL film : {data?.show?.url_video_film}
        </p>

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
