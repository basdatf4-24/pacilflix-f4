import { Button } from "~/lib/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/lib/ui/card";
import { FilmData } from "./constant";
import { Link } from "@remix-run/react";
import { Label } from "@radix-ui/react-label";

export default function HalamanFilm() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="text-center">
          <CardTitle>{FilmData.judul}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="default" className="w-[30%]">Tonton</Button>
          <Button variant="default" className="w-[30%]">Unduh Tayangan</Button>
          <Button variant="default" className="w-[30%]">Favorit Tayangan</Button>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Label><strong>Total View:</strong> {FilmData.totalView}</Label>
          <Label><strong>Rating Rata-Rata:</strong> {FilmData.rating}</Label>
          <Label><strong>Sinopsis:</strong> {FilmData.sinopsisfilm}</Label>
          <Label><strong>Durasi Film:</strong> {FilmData.durasi}</Label>
          <Label><strong>Tanggal Rilis Film:</strong> {FilmData.tanggalRilisfilm}</Label>
          <Label><strong>URL Film:</strong></Label>
          <a href={FilmData.urlfilm} className="text-blue-600 underline">{FilmData.urlfilm}</a>
          <Label><strong>Genre:</strong></Label>
          <ul className="list-disc pl-8">
            {FilmData.genre.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <Label><strong>Asal Negara:</strong> {FilmData.asalNegara}</Label>
          <Label><strong>Pemain:</strong></Label>
          <ul className="list-disc pl-8">
            {FilmData.pemain.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          <Label><strong>Penulis Skenario:</strong></Label>
          <ul className="list-disc pl-8">
            {FilmData.penulisSkenario.map((writer, index) => (
              <li key={index}>{writer}</li>
            ))}
          </ul>
          <Label><strong>Sutradara:</strong> {FilmData.sutradara}</Label>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Link to="/review" className="flex items-center justify-center">
            <Button variant="default" className="w-[30%]">
              Ulasan
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
