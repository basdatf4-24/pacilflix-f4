import { type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { redirectWithError } from "remix-toast";
import {
  getAnotherEpisode,
  getEpisodeDetail,
} from "~/lib/repository/shows/shows.server";
import { getAuthUser } from "~/lib/server/auth.server";
import { Button } from "~/lib/ui/button";
import { Slider } from "~/lib/ui/slider";

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (
    params.showId === "" ||
    !params.showId ||
    params.showId === null ||
    params.subEpisode === "" ||
    !params.subEpisode ||
    params.subEpisode === null
  ) {
    return redirectWithError("Episode tidak ditemukan", "/shows");
  }
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;

  let episodeDetail = await getEpisodeDetail({
    episodeId: params.subEpisode,
    showId: params.showId,
  });

  let anotherEpisode = await getAnotherEpisode({
    episodeId: params.subEpisode,
    showId: params.showId,
  });

  if (!episodeDetail) {
    return redirectWithError("Episode tidak ditemukan", "/shows");
  }

  return {
    episodeDetail,
    anotherEpisode,
    showId: params.showId,
    subEpisode: params.subEpisode,
  };
}

export default function EpisodePage() {
  const fetcher = useFetcher();
  const { episodeDetail, anotherEpisode, showId } =
    useLoaderData<typeof loader>();

  let episodeReleaseDate = new Date(episodeDetail.release_date);
  let formatDate = `${episodeReleaseDate.getFullYear()}-${episodeReleaseDate.getMonth()}-${episodeReleaseDate.getDate()}`;
  return (
    <div className="w-full px-10 py-10 flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold text-center">Halaman Episode</h1>

      <p className="font-semibold">Judul: {episodeDetail?.judul}</p>
      <p className="font-semibold">Sub Judul: {episodeDetail?.sub_judul}</p>
      <fetcher.Form
        method="post"
        action="/_actions/watch"
        className="space-y-8"
      >
        <Slider defaultValue={[0]} min={0} max={100} step={1} name="watch" />
        <input type="hidden" name="showId" value={showId} />
        <input type="hidden" name="showDuration" value={episodeDetail.durasi} />
        <Button className="w-[200px]">Tonton sekarang</Button>
      </fetcher.Form>
      <div className="space-y-2 flex flex-col">
        <p className="font-semibold">Epiosode Lainnya: </p>
        {anotherEpisode.map((item, index) => {
          return (
            <Link to={`/shows/watch/${showId}/${item.sub_judul}`} key={index}>
              <Button variant="ghost">{item.sub_judul}</Button>
            </Link>
          );
        })}
      </div>

      <p>Sinopsis episode: {episodeDetail.sinopsis}</p>
      <p>Durasi episode: {episodeDetail.durasi}</p>
      <p>URL episode: {episodeDetail.url_video}</p>
      <p>Tanggal rilis episode: {formatDate}</p>
    </div>
  );
}
