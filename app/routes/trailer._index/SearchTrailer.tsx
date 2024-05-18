import { Link } from "@remix-run/react";
import { Table, 
TableCaption, 
TableHeader, 
TableRow, 
TableHead, 
TableBody, 
TableCell } from "~/lib/ui/table";

export function SearchTayangan({ data }: { data: any }) {
  return (
    <div className="w-full flex flex-col items-center">
      <Table className="w-full">
        <TableCaption>Hasil Pencarian</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Synopsis</TableHead>
            <TableHead>Trailer URL</TableHead>
            <TableHead>Release Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.searchResult.map((item: any, index: number) => {
            let date = new Date(item.release_date_trailer);
            let format = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            return (
              <TableRow key={index}>
                <TableCell>{item.judul}</TableCell>
                <TableCell>{item.sinopsis_trailer}</TableCell>
                <TableCell>
                  <Link to={item.url_video_trailer} className="text-blue-600 dark:text-blue-400 underline">
                    {item.url_video_trailer}
                  </Link>
                </TableCell>
                <TableCell>{format}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
