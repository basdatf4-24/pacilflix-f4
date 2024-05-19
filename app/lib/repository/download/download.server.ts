import sql from "~/lib/server/db.server";

export async function getDownloadedShows({ username }: { username: string }) {
  let res = await sql`SELECT td.*, t.* FROM TAYANGAN_TERUNDUH td JOIN
    TAYANGAN t ON t.ID = td.ID_TAYANGAN WHERE USERNAME = ${username} `;
  return res;
}

export async function deleteDownloadedShows({
  id,
  username,
  timestamp,
}: {
  id: string;
  username: string;
  timestamp: string;
}): Promise<void> {
  let res =
    await sql`DELETE FROM TAYANGAN_TERUNDUH WHERE ID_TAYANGAN=${id} AND USERNAME=${username} AND TIMESTAMP=${timestamp} RETURNING *`;

  if (res.length === 0) {
    throw new Error(
      "Opps! gagal menghapus! kamu harus menunggu 24 jam untuk menghapus daftar unduhan"
    );
  }
}

export async function addDownloadShow({
  showId,
  username,
  timestamp,
}: {
  showId: string;
  username: string;
  timestamp: string;
}) {
  let res =
    await sql`INSERT INTO TAYANGAN_TERUNDUH (ID_TAYANGAN, USERNAME, TIMESTAMP) VALUES (${showId}, ${username}, ${timestamp}) RETURNING *`;
  return res[0];
}
