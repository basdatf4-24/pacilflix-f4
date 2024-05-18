import { Button } from "~/lib/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/lib/ui/card";
import { SeriesData } from "./constant";
import { Form, Link, json } from "@remix-run/react";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/lib/ui/select";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useState, FormEvent } from "react";
import { Textarea } from "~/lib/ui/textarea";

const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const rating = formData.get("rating")?.toString() || "";
  const review = formData.get("review")?.toString() || "";
  return json({ rating, review });
}

export default function HalamanSeries() {
  const [selectedRating, setSelectedRating] = useState("");
  const [reviews, setReviews] = useState<{ rating: string; review: string }[]>(
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const review = formData.get("review")?.toString() || "";
    const rating = formData.get("rating")?.toString() || "";
    setReviews([{ review, rating }, ...reviews]);
    setSelectedRating("");
    event.currentTarget.reset();
  };
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
                <Link
                  to="/tayangan/episode"
                  className="text-blue-600 underline"
                >
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
          <Label>
            <strong>Total View:</strong> {SeriesData.totalView}
          </Label>
          <Label>
            <strong>Sinopsis:</strong> {SeriesData.sinopsisfilm}
          </Label>
          <Label>
            <strong>Asal Negara:</strong> {SeriesData.asalNegara}
          </Label>
          <Label>
            <strong>Genre:</strong>
          </Label>
          <ul className="list-disc pl-8">
            {SeriesData.genre.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <Label>
            <strong>Pemain:</strong>
          </Label>
          <ul className="list-disc pl-8">
            {SeriesData.pemain.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          <Label>
            <strong>Penulis Skenario:</strong>
          </Label>
          <ul className="list-disc pl-8">
            {SeriesData.penulisSkenario.map((writer, index) => (
              <li key={index}>{writer}</li>
            ))}
          </ul>
          <Label>
            <strong>Sutradara:</strong> {SeriesData.sutradara}
          </Label>
        </div>

        <div className="text-center mt-8">
          <CardTitle>Ulasan</CardTitle>
        </div>

        <div className="w-full relative flex flex-col items-center p-4">
          <Form
            method="POST"
            action="/review"
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8"
            style={{ textAlign: "center" }}
          >
            <div className="flex flex-col gap-4">
              <Label htmlFor="rating">Rating</Label>
              <Select
                name="rating"
                value={selectedRating}
                onValueChange={(value) => setSelectedRating(value)}
              >
                <SelectTrigger>
                  {selectedRating ? selectedRating : "Select rating"}
                </SelectTrigger>
                <SelectContent>
                  {RATINGS.map((rating, index) => (
                    <SelectItem key={index} value={rating.toString()}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="review">Review</Label>
              <Textarea
                id="review"
                name="review"
                placeholder="Enter your review for this film"
                style={{ textAlign: "left" }} // Menengahkan teks area review
              />
            </div>

            <Button variant="default" className="w-full" type="submit">
              Submit
            </Button>
          </Form>
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Daftar Ulasan:</h2>
            <div className="w-full">
              {reviews.map((review, index) => (
                <Card
                  key={index}
                  className="w-full mb-4"
                  style={{ maxWidth: "800px" }}
                >
                  <CardContent
                    className="relative"
                    style={{ overflowWrap: "break-word" }}
                  >
                    <div className="mb-2 mt-3">
                      <span className="font-semibold">Rating: </span>
                      {review.rating}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Review: </span>
                      {review.review}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
