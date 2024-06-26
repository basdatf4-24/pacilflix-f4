import sql from "~/lib/server/db.server";

export async function createUlasan({
  username,
  idTayangan,
  rating,
  deskripsi,
}: {
  username: string;
  idTayangan: string;
  rating: number;
  deskripsi: string;
}) {
  let timestamp = new Date().toISOString();
  let res = await sql`
        INSERT INTO ulasan (id_tayangan, username, timestamp, rating, deskripsi)
        VALUES (${idTayangan}, ${username}, ${timestamp}, ${rating}, ${deskripsi})
        RETURNING id_tayangan, username, timestamp, rating, deskripsi
    `;

  return res[0];
}
export async function getShowReviews({ showId }: { showId: string }) {
  let res =
    await sql`SELECT * FROM ulasan WHERE id_tayangan = ${showId} ORDER BY timestamp DESC`;
  return res;
}
