import { Button } from "~/lib/ui/button";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Card, CardHeader, CardTitle, CardContent,CardDescription } from "~/lib/ui/card";
import { FilmData } from "./constant";
import { Form, Link } from "@remix-run/react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "~/lib/ui/textarea";
import { FormEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "~/lib/ui/select";

const RATINGS = [1, 2, 3, 4, 5,6,7,8,9,10];

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const rating = formData.get("rating")?.toString() || ""; 
  const review = formData.get("review")?.toString() || ""; 
  console.log(rating, review);
  return json({ rating, review });
}


export default function HalamanFilm() {
  const [selectedRating, setSelectedRating] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const [reviews, setReviews] = useState<{ rating: string; review: string }[]>([]);
  const favoriteLists = ["List 1", "List 2", "List 3"]; 

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const review = formData.get("review")?.toString() || ""; 
    const rating = formData.get("rating")?.toString() || ""; 
    setReviews([{ review, rating }, ...reviews]);
    setSelectedRating("");
    event.currentTarget.reset(); 
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleListSelect = (value:string) => {
    setSelectedList(value);
  };


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
          <Button variant="default" className="w-[30%]" onClick={handleModalOpen}>Favorit Tayangan</Button>
        </div>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg w-[400px] p-6">
              <CardHeader>
                <CardTitle>Tambah ke Daftar Favorit</CardTitle>
                <CardDescription>Pilih daftar favorit untuk menambahkan film ini.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="favoriteList">Judul Daftar Favorit:</Label>
                    <Select
                      name="favoriteList" // Changed name to 'favoriteList'
                      defaultValue={selectedList} // Added default value
                      onValueChange={handleListSelect}
                    >
                      <SelectTrigger>{selectedList ? selectedList : "Pilih daftar favorit"}</SelectTrigger>
                      <SelectContent>
                        {favoriteLists.map((list, index) => (
                          <SelectItem key={index} value={list}>
                            {list}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="default" onClick={handleModalClose} className="mr-2">
                      Batal
                    </Button>
                    <Button variant="default" onClick={handleModalClose}>
                      Tambah
                    </Button>
                  </div>
                </Form>
              </CardContent>
            </div>
          </div>
        )}


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

        <div className="text-center mt-8">
          <CardTitle>Ulasan</CardTitle>
        </div>

        <div className="w-full relative flex flex-col items-center p-4">
          <Form
            method="POST"
            action="/review"
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8"
            style={{ textAlign: 'center' }}
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
                style={{ textAlign: 'left' }} // Menengahkan teks area review
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
                <Card key={index} className="w-full mb-4" style={{ maxWidth: '800px' }}>
                  <CardContent className="relative" style={{ overflowWrap: 'break-word' }}> 
                    <div className="mb-2 mt-3">
                      <span className="font-semibold">Rating: </span>{review.rating}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Review: </span>{review.review}
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
