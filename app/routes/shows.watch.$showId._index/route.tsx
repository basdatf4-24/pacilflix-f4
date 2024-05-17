import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { redirectWithError } from "remix-toast";
import {
  getEpisode,
  getGenre,
  getShowDetail,
  getShowRating,
  getShowVideo,
} from "~/lib/repository/shows/shows.server";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";
import SeriesPage from "./Series";
import { getContributorsByShowId } from "~/lib/repository/contributor/contributor.server";
import FilmPage from "./Film";
import { getFavoriteList } from "~/lib/repository/favorite/favorite.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (params.showId === "" || !params.showId || params.showId === null) {
    return redirectWithError("Tayangan tidak ditemukan", "/shows");
  }
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  let showId = params.showId;

  let username = await getUserFromRequest(request);

  let show = await getShowDetail({ showId });
  let contributors = await getContributorsByShowId(showId);
  let genres = await getGenre({ showId });
  let episode = await getEpisode({ seriesId: show.series_id });
  let showCount = await getShowVideo({ showId });
  let showRating = await getShowRating({ showId });
  let favoriteList = await getFavoriteList({ username });
  if (!show) {
    return redirectWithError("Tayangan tidak ditemukan", "/shows");
  }

  return {
    show,
    showId,
    contributors,
    genres,
    episode,
    showCount,
    showRating,
    favoriteList,
  };
}

export default function WatchShowPage() {
  let { show } = useLoaderData<typeof loader>();
  return show.type === "FILM" ? <FilmPage /> : <SeriesPage />;
}
