import { useEffect, useState } from 'react';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/lib/ui/table";
import { Film } from "./constant"; 
import { Button } from '~/lib/ui/button';
import { Input } from '~/lib/ui/input';
import { Link } from "@remix-run/react";

export default function TayanganPenggunaPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);
    const filteredFilm = Film.filter((film) =>
      film.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mengatur nilai showSearchResult berdasarkan panjang searchTerm
    useEffect(() => {
      setShowSearchResult(searchTerm.length > 0);
    }, [searchTerm]);

    // Fungsi untuk menampilkan atau menyembunyikan kolom terakhir
  

  return (
    <div className="relative flex flex-col w-full px-10 py-5 items-center">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-2">
        <h2 className="text-2xl text-center mb-4">Daftar Tayangan</h2>
        <div className="w-full relative flex flex-col items-center mb-4">
          <Input
            type="text"
            placeholder="Cari judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md gap-4"
          />
        </div>
        {showSearchResult && (
          <div className="w-full relative flex flex-col items-center gap-4">
            <Table className="w-full">
              <TableCaption>Hasil Pencarian</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Synopsis</TableHead>
                  <TableHead>Trailer URL</TableHead>
                  <TableHead>Tanggal Rilis Trailer</TableHead>
                  <TableHead>Tayangan</TableHead> {/* Kolom baru */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFilm.map((film, index) => (
                  <TableRow key={index}>
                    <TableCell>{film.judul}</TableCell>
                    <TableCell>{film.sinopsisfilm}</TableCell>
                    <TableCell><a href={film.urlfilm}>Lihat Trailer</a></TableCell>
                    <TableCell>{film.tanggalRilisfilm}</TableCell>
                    <TableCell>{/* Isi kolom terakhir disini */}</TableCell>
                    <TableCell>
                      <Link
                        to="/authentication/login"
                        className="flex items-center justify-center w-full"
                        >
                        <Button variant="default" className="w-[100%]">
                            Lihat Tayangan
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <h1 className="text-center text-xl mb-4">Top 10 Tayangan Terbaik Minggu Ini</h1>
      <div className="w-full relative flex flex-col items-center gap-4">
        <div className="flex justify-center mb-4 gap-4">
          <Button variant="default" className="w-[50%]">
            Top 10 Film Peringkat Global
          </Button>
          <Button variant="default" className="w-[50%]">
            Top 10 Film Peringkat Lokal
          </Button>
        </div>
        <Table className="w-full">
          <TableCaption>Top 10 Film</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Views (7 Days)</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Tayangan</TableHead> {/* Kolom baru */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Film.map((film, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{film.peringkat}</TableCell>
                <TableCell>{film.judul}</TableCell>
                <TableCell>{film.sinopsisfilm}</TableCell>
                <TableCell>{film.tanggalRilisfilm}</TableCell>
                <TableCell>{film.totalView7Hari}</TableCell>
                <TableCell><a href={film.urlfilm}>Lihat Trailer</a></TableCell>
                <TableCell>
                <Link
                    to="tayangan/film"
                    className="flex items-center justify-center w-full"
                    >
                    <Button variant="default" className="w-[100%]">
                        Lihat Tayangan
                    </Button>
                    </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h2 className="text-xl mt-8 mb-4">Daftar Film</h2>
        <Table className="w-full">
          <TableCaption>Daftar Film</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Tanggal Rilis Trailer</TableHead>
              <TableHead>Tayangan</TableHead> {/* Kolom baru */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFilm.map((film, index) => (
              film.jenis === 'film' && (
                <TableRow key={index}>
                  <TableCell>{film.judul}</TableCell>
                  <TableCell>{film.sinopsisfilm}</TableCell>
                  <TableCell><a href={film.urlfilm}>Lihat Trailer</a></TableCell>
                  <TableCell>{film.tanggalRilisfilm}</TableCell>
                  <TableCell>
                  <Link
                    to="/tayangan/film"
                    className="flex items-center justify-center w-full"
                    >
                    <Button variant="default" className="w-[100%]">
                        Lihat Tayangan
                    </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>

        <h2 className="text-xl mt-8 mb-4">Daftar Series</h2>
        <Table className="w-full">
          <TableCaption>Daftar Series</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Synopsis</TableHead>
              <TableHead>Trailer URL</TableHead>
              <TableHead>Tanggal Rilis Trailer</TableHead>
              <TableHead>Tayangan</TableHead> {/* Kolom baru */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFilm.map((film, index) => (
              film.jenis === 'series' && (
                <TableRow key={index}>
                  <TableCell>{film.judul}</TableCell>
                  <TableCell>{film.sinopsisfilm}</TableCell>
                  <TableCell><a href={film.urlfilm}>Lihat Trailer</a></TableCell>
                  <TableCell>{film.tanggalRilisfilm}</TableCell>
                  <TableCell>
                  <Link
                    to="/tayangan/series"
                    className="flex items-center justify-center w-full"
                    >
                    <Button variant="default" className="w-[100%]">
                        Lihat Tayangan
                    </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
        
      </div>
    </div>
    
  );

  
}
