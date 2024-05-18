import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import type { loader as showsLoader } from "./route";
import { Card, CardContent } from "~/lib/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserRound } from "lucide-react";
import { Textarea } from "~/lib/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "~/lib/ui/input";
import { Button } from "~/lib/ui/button";

export default function Ulasan() {
  let data = useRouteLoaderData<typeof showsLoader>(
    "routes/shows.watch.$showId._index"
  );

  let fetcher = useFetcher();

  if (data?.showReviews.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        <h1 className="font-bold text-xl text-center">Ulasan</h1>
        <h2>Belum ada ulasan</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 items-center justify-center">
        <h1 className="font-bold text-xl text-center">Buat ulasan</h1>
        <fetcher.Form
          className="w-[50%] space-y-8"
          method="post"
          action="/_actions/create-review"
        >
          <div className="space-y-4">
            <Label id="rating" className="font=semibold">
              Rating
            </Label>
            <Input id="rating" type="number" min={1} max={5} name="rating" />
            <input type="hidden" name="showId" value={data?.showId} />
          </div>
          <div className="space-y-4">
            <Label htmlFor="desc" className="font-semibold">
              Deskripsi (Opsional)
            </Label>
            <Textarea id="desc" name="description" />
          </div>
          <Button className="w-full">Kirim ulasan</Button>
        </fetcher.Form>
      </div>
      <div className="w-full flex flex-col space-y-4">
        <h1 className="font-bold text-xl text-center">Daftar ulasan</h1>
        <div className="flex flex-col space-y-4">
          {data?.showReviews.map((review, index) => {
            let date = new Date(review.timestamp);
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
            let day = String(date.getDate()).padStart(2, "0");
            let hour = String(date.getHours()).padStart(2, "0");
            let minute = String(date.getMinutes()).padStart(2, "0");
            let format = `${year}-${month}-${day} ${hour}:${minute}`;
            return (
              <Card
                className="relative w-full p-6 flex flex-col gap-4"
                key={index}
              >
                <CardContent>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-center">
                      <div className="flex justify-center items-center w-12 h-12">
                        <UserRound />
                      </div>
                      <div className="grid gap-1 text-sm">
                        <div className="font-medium">{review.username}</div>
                        <time className="text-gray-500 dark:text-gray-400">
                          {format}
                        </time>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{review.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm leading-loose text-gray-500 dark:text-gray-400">
                    <p>{review.deskripsi || "Tidak ada deskripsi ulasan."}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
