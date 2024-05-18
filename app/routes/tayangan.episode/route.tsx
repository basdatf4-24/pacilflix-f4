import { Button } from "~/lib/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/lib/ui/card";
import { EpisodeData } from "./constant" 
import { Link } from "@remix-run/react";

export default function HalamanEpisode() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="text-center">
          <CardTitle>{EpisodeData.judul}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <p><strong>Sub Judul</strong>: {EpisodeData.subJudul}</p>

        <div className="flex justify-center mt-8">
          <Button variant="default">Tonton</Button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Episode Lainnya:</h3>
          <ul className="list-disc pl-8">
            {EpisodeData.episodeLainnya.map((link, index) => (
              <li key={index}>
                <Link to="/tayangan/episode" className="text-blue-600 underline">
                  Lihat Episode
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <p><strong>Sinopsis Episode:</strong> {EpisodeData.sinopsisEpisode}</p>
          <p><strong>Durasi Episode:</strong> {EpisodeData.durasiEpisode}</p>
          <p><strong>URL Episode:</strong> <a href={EpisodeData.urlEpisode} className="text-blue-600 underline">{EpisodeData.urlEpisode}</a></p>
          <p><strong>Tanggal Rilis Episode:</strong> {EpisodeData.tanggalRilisEpisode}</p>
        </div>
      </CardContent>
    </Card>
  );
}
