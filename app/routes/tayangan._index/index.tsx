import { type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  getAllMovie,
  getAllSeries,
  getTopTayanganGlobalThisWeek,
  getTopTayanganRegionalThisWeek,
  searchTayangan,
} from "~/lib/repository/tayangan/tayangan.server";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";
import { Input } from "~/lib/ui/input";
import { Label } from "~/lib/ui/label";
import DaftarTayangan from "./DaftarTayangan";
import { SearchTayangan } from "./SearchTayangan";

export async function loader({ request }: LoaderFunctionArgs) {
  let redirect = await getAuthUser(request);
  if (redirect) {
    return redirect;
  }
  let username = await getUserFromRequest(request);
  let search = new URL(request.url).searchParams.get("search");

  if (search) {
    let searchResult = await searchTayangan(search);
    return {
      searchResult,
      search,
    };
  }

  let movies = await getAllMovie();
  let series = await getAllSeries();
  let topMovieGlobal = await getTopTayanganGlobalThisWeek();
//   let topMovieLokal = await getTopTayanganRegionalThisWeek({ username: username.nama });

  return {
    movies,
    series,
    username,
    search,
    topMovieGlobal,
    // topMovieLokal,
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data?.search);

  return (
    <div className="w-full px-10 py-10 flex flex-col space-y-10">
      <Form method="get">
        <div className="space-y-4 flex flex-col justify-center items-center">
          <Label htmlFor="search text-center">Search Film or Series</Label>
          <Input type="text" name="search" id="search" />
        </div>
      </Form>

      {data?.search ? (
        <SearchTayangan data={data} />
      ) : (
        <DaftarTayangan data={data} />
      )}
    </div>
  );
}