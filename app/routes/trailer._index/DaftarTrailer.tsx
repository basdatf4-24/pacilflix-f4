import { Label } from "@radix-ui/react-dropdown-menu";
import { Link } from "@remix-run/react";
import { 
Table, 
TableCaption, 
TableHeader, 
TableRow, 
TableHead, 
TableBody, 
TableCell } from "~/lib/ui/table";
import { Button } from '~/lib/ui/button';

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

      <div>
        <Label className="text-2xl">Film</Label>
        <Table className="w-full">
          <TableCaption>Daftar Film</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Release Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.movies.map((movie: any, index: number) => {
              let date = new Date(movie.release_date_trailer);
              let format = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell>{movie.judul}</TableCell>
                  <TableCell>{movie.sinopsis_trailer}</TableCell>
                  <TableCell>
                    <Link to={movie.url_video_trailer} className="text-blue-600 dark:text-blue-400 underline">
                      {movie.url_video_trailer}
                    </Link>
                  </TableCell>
                  <TableCell>{format}</TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div>
        <Label className="text-2xl">Series</Label>
        <Table className="w-full">
          <TableCaption>Daftar Series</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Release Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.series.map((series: any, index: number) => {
              let date = new Date(series.release_date_trailer);
              let format = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
              return (
                <TableRow key={index}>
                  <TableCell>{series.judul}</TableCell>
                  <TableCell>{series.sinopsis_trailer}</TableCell>
                  <TableCell>
                    <Link to={series.url_video_trailer} className="text-blue-600 dark:text-blue-400 underline">
                      {series.url_video_trailer}
                    </Link>
                  </TableCell>
                  <TableCell>{format}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}