import { useState } from "react";
import { Button } from "~/lib/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/lib/ui/table";

const favoriteData = [
  { judul: "Film A", waktuDitambahkan: "2024-05-03" },
  { judul: "Film B", waktuDitambahkan: "2024-05-04" }
];

export default function DaftarFavorit() {
  const [favorit, setFavorit] = useState(favoriteData);

  return (
    <div className="w-full relative flex flex-col items-center gap-4">
      <Table className="w-full">
        <TableCaption>Daftar Favorit</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Waktu Ditambahkan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {favorit.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.judul}</TableCell>
              <TableCell>{item.waktuDitambahkan}</TableCell>
              <TableCell>
                <Button variant="default">Hapus</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
