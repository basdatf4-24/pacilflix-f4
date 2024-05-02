import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/lib/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/lib/ui/card";
import { Label } from "~/lib/ui/label";
import { FormEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "~/lib/ui/select";
import { Textarea } from "~/lib/ui/textarea";

const RATINGS = [1, 2, 3, 4, 5,6,7,8,9,10];

export async function loader() {
  return json({});
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const rating = formData.get("rating")?.toString() || ""; 
  const review = formData.get("review")?.toString() || ""; 
  console.log(rating, review);
  return json({ rating, review });
}

export default function ReviewPage() {
  const [selectedRating, setSelectedRating] = useState("");
  const [reviews, setReviews] = useState<{ rating: string; review: string }[]>([]);

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
    <Card className="w-[300%]">
      <CardHeader>
        <div className="text-center">
          <CardTitle>Review</CardTitle>
          <CardDescription>Form Review</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="w-full relative flex flex-col items-center p-4">
        <Form
          method="POST"
          action="/review"
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-8"
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
              <div key={index} className="mb-4">
                <Card className="w-full">
                  <CardContent>
                    <div className="mb-2">
                      <span className="font-semibold">Rating: </span>{review.rating}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Review: </span>{review.review}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div> 

          
      </CardContent>
    </Card>
  );
}
