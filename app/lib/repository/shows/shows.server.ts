import sql from "~/lib/server/db.server";

export async function getShowDetail({ showId }: { showId: string }) {
  let res = await sql`SELECT 
  t.*,
  f.URL_VIDEO_FILM, f.RELEASE_DATE_FILM, f.DURASI_FILM,
  s.ID_TAYANGAN AS series_id,
  CASE
    WHEN f.ID_TAYANGAN IS NOT NULL THEN 'FILM'
    WHEN s.ID_TAYANGAN IS NOT NULL THEN 'SERIES'
    END AS type,
    c.NAMA AS sutradara
FROM 
  TAYANGAN t
LEFT JOIN 
  FILM f ON t.ID = f.ID_TAYANGAN
LEFT JOIN 
  SERIES s ON t.ID = s.ID_TAYANGAN
LEFT JOIN
    CONTRIBUTORS c ON c.id = t.ID_SUTRADARA
WHERE 
  t.ID = ${showId};`;
  return res[0];
}

export async function getGenre({ showId }: { showId: string }) {
  let res =
    await sql`SELECT * FROM GENRE_TAYANGAN WHERE ID_TAYANGAN = ${showId}`;
  return res;
}

export async function getEpisode({ seriesId }: { seriesId: string }) {
  let res = await sql`SELECT * FROM EPISODE WHERE ID_SERIES = ${seriesId}`;
  return res;
}

export async function getShowVideo({ showId }: { showId: string }) {
  let res =
    await sql`SELECT COUNT(*) FROM RIWAYAT_NONTON WHERE ID_TAYANGAN = ${showId}`;
  return res[0];
}

export async function getShowRating({ showId }: { showId: string }) {
  let res =
    await sql`SELECT AVG(RATING) FROM ULASAN WHERE ID_TAYANGAN = ${showId}`;
  return res[0];
}

export async function getEpisodeDetail({
  episodeId,
  showId,
}: {
  episodeId: string;
  showId: string;
}) {
  let episodeTitle = episodeId.toLowerCase();
  let res =
    await sql`SELECT e.*, s.judul FROM EPISODE e JOIN TAYANGAN s ON s.id = e.id_series 
    WHERE ID_SERIES = ${showId} AND LOWER(SUB_JUDUL) = ${episodeTitle}`;
  return res[0];
}

export async function getAnotherEpisode({
  episodeId,
  showId,
}: {
  episodeId: string;
  showId: string;
}) {
  let res =
    await sql`SELECT * FROM EPISODE WHERE ID_SERIES = ${showId} AND SUB_JUDUL != ${episodeId}`;
  return res;
}

export async function watchShow({
  showId,
  username,
  duration,
}: {
  showId: string;
  username: string;
  duration: number;
}) {
  let curr_time = new Date();
  let end_date = new Date(curr_time.getTime() + duration * 60000);

  let curr_time_str = curr_time.toISOString();
  let end_date_str = end_date.toISOString();
  let res =
    await sql`INSERT INTO RIWAYAT_NONTON (id_tayangan, username, start_date_time, end_date_time) VALUES (${showId}, ${username}, ${curr_time_str}, ${end_date_str})`;
  return res[0];
}
