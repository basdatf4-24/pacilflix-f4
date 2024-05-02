import { Button } from "~/lib/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/lib/ui/card";
import { SeriesData } from "./constant";
import { Link } from "@remix-run/react";
import { Label } from "@radix-ui/react-label";

export default function HalamanSeries() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="text-center">
          <CardTitle>{SeriesData.judul}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Episode:</h3>
          <ul>
            {SeriesData.episode.map((episode, index) => (
              <li key={index}>
                <span className="font-semibold">Episode {episode.nomor}: </span>
                <Link to="/tayangan/episode" className="text-blue-600 underline">
                  Tonton
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="default" className="w-[30%]">
            Unduh Tayangan
          </Button>
          <Button variant="default" className="w-[30%]">
            Tambah Favorit
          </Button>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Label><strong>Total View:</strong> {SeriesData.totalView}</Label>
          <Label><strong>Sinopsis:</strong> {SeriesData.sinopsisfilm}</Label>
          <Label><strong>Asal Negara:</strong> {SeriesData.asalNegara}</Label>
          <Label><strong>Genre:</strong></Label>
          <ul className="list-disc pl-8">
            {SeriesData.genre.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <Label><strong>Pemain:</strong></Label>
          <ul className="list-disc pl-8">
            {SeriesData.pemain.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          <Label><strong>Penulis Skenario:</strong></Label>
          <ul className="list-disc pl-8">
            {SeriesData.penulisSkenario.map((writer, index) => (
              <li key={index}>{writer}</li>
            ))}
          </ul>
          <Label><strong>Sutradara:</strong> {SeriesData.sutradara}</Label>
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
