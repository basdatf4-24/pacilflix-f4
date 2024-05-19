import { Link } from "@remix-run/react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/lib/ui/table";
import { Button } from "~/lib/ui/button";
import { Label } from "@radix-ui/react-label";

export default function DaftarTayangan({ data }: { data: any }) {
  return (
    <>
      <div className="flex justify-center mb-4 gap-4">
        <Button variant="default" className="w-[50%]">
          Top 10 Film Peringkat Global
        </Button>
        <Button variant="default" className="w-[50%]">
          Top 10 Film Peringkat Lokal
        </Button>
      </div>
      <div className="space-y-10">
        <h2 className="text-2xl font-semibold">Film</h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
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
              <TableHead>Title</TableHead>
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
    </>
  );
}
