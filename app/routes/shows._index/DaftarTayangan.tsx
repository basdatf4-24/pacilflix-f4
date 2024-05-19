import { Link } from "@remix-run/react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/lib/ui/table";
import { Button } from "~/lib/ui/button";

export default function DaftarTayangan({ data }: { data: any }) {
  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col justify-center space-y-5">
        <h2 className="font-xl font-semibold text-center">
          Top 10 Film Peringkat Global
        </h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Total View for 7 days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.topMovieGlobal.map((movie: any, index: number) => {
              let date = new Date(movie.release_date_trailer);
              let format = `${date.getFullYear()}/${
                date.getMonth() + 1
              }/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell className="font-bold">{index + 1}</TableCell>
                  <TableCell>{movie.judul}</TableCell>
                  <TableCell>{movie.sinopsis_trailer}</TableCell>
                  <TableCell>
                    <Link
                      to={movie.url_video_trailer}
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      {movie.url_video_trailer}
                    </Link>
                  </TableCell>
                  <TableCell>{format}</TableCell>
                  <TableCell className="font-bold">{movie.view}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-10">
        <h2 className="text-2xl font-semibold">Film</h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.movies.map((movie: any, index: number) => {
              let date = new Date(movie.release_date_trailer);
              let format = `${date.getFullYear()}/${
                date.getMonth() + 1
              }/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell>{movie.judul}</TableCell>
                  <TableCell>{movie.sinopsis_trailer}</TableCell>
                  <TableCell>
                    <Link
                      to={movie.url_video_trailer}
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      {movie.url_video_trailer}
                    </Link>
                  </TableCell>
                  <TableCell>{format}</TableCell>
                  <TableCell>
                    <Link to={`/shows/watch/${movie.id}`}>
                      <Button variant="default" className="w-full">
                        Lihat Tayangan
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-10">
        <h2 className="text-2xl font-semibold">Series</h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.series.map((series: any, index: number) => {
              let date = new Date(series.release_date_trailer);
              let format = `${date.getFullYear()}/${
                date.getMonth() + 1
              }/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell>{series.judul}</TableCell>
                  <TableCell>{series.sinopsis_trailer}</TableCell>
                  <TableCell>
                    <Link
                      to={series.url_video_trailer}
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      {series.url_video_trailer}
                    </Link>
                  </TableCell>
                  <TableCell>{format}</TableCell>
                  <TableCell>
                    <Link to={`/shows/watch/${series.id}`}>
                      <Button variant="default" className="w-full">
                        Lihat Tayangan
                      </Button>
                    </Link>
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
