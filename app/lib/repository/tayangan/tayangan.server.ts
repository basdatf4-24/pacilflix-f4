import sql from "~/lib/server/db.server";

export async function getAllMovie() {
  let res =
    await sql`SELECT t.* FROM TAYANGAN t JOIN FILM f on f.id_tayangan = t.id`;

  return res;
}

export async function getAllSeries() {
  let res =
    await sql`SELECT t.* FROM TAYANGAN t JOIN SERIES s on s.id_tayangan = t.id`;
  return res;
}

export async function searchTayangan(keyword: string) {
  let res = await sql`SELECT * FROM TAYANGAN WHERE JUDUL ILIKE ${
    "%" + keyword + "%"
  }`;
  return res;
}

export async function getTopTayanganGlobalThisWeek() {
  let res = await sql`
    SELECT 
      T.id, 
      T.judul, 
      T.sinopsis_trailer, 
      T.url_video_trailer, 
      T.release_date_trailer, 
      COUNT(AC.id_tayangan) AS view
    FROM 
      TAYANGAN T
    LEFT JOIN (
      SELECT 
        id_tayangan 
      FROM (
        SELECT 
          F.id_tayangan, 
          ((EXTRACT(EPOCH FROM (RN.end_date_time - RN.start_date_time)) / 60) / F.durasi_film) AS percent_completed
        FROM 
          FILM F
        JOIN RIWAYAT_NONTON RN ON F.id_tayangan = RN.id_tayangan
        WHERE 
          ((EXTRACT(EPOCH FROM (RN.end_date_time - RN.start_date_time)) / 60) / F.durasi_film) >= 0.7
          AND RN.end_date_time >= NOW() - INTERVAL '7 days'
        
        UNION ALL
        
        SELECT 
          S2.id_tayangan, 
          ((EXTRACT(EPOCH FROM (RN.end_date_time - RN.start_date_time)) / 60) / S2.average_duration) AS percent_completed
        FROM (
          SELECT    
            S1.id_tayangan, 
            AVG(E.durasi) AS average_duration
          FROM 
            SERIES S1 
          JOIN EPISODE E ON S1.id_tayangan = E.id_series
          GROUP BY 
            S1.id_tayangan
        ) AS S2
        JOIN RIWAYAT_NONTON RN ON S2.id_tayangan = RN.id_tayangan
        WHERE 
          ((EXTRACT(EPOCH FROM (RN.end_date_time - RN.start_date_time)) / 60) / S2.average_duration) >= 0.7
          AND RN.end_date_time >= NOW() - INTERVAL '7 days'
      ) AS Completions
    ) AS AC ON T.id = AC.id_tayangan
    GROUP BY 
      T.id, 
      T.judul, 
      T.sinopsis_trailer, 
      T.url_video_trailer, 
      T.release_date_trailer
    ORDER BY 
      view DESC, 
      T.judul ASC
    LIMIT 10;
  `;
  return res;
}

export async function getTopTayanganRegionalThisWeek({
  username,
}: {
  username: string;
}) {
  let res = sql`
        SELECT T.id, T.judul, T.sinopsis_trailer, T.url_video_trailer, T.release_date_trailer, count(RN) AS view
        FROM (
        SELECT *
        FROM TAYANGAN
        WHERE TAYANGAN.asal_negara IN (
            SELECT P.negara_asal 
            FROM PENGGUNA P
            WHERE P.username = ${username}
        )
        ) T 
        LEFT OUTER JOIN RIWAYAT_NONTON RN ON RN.id_tayangan = T.id AND current_timestamp - RN.start_date_time < interval '7 days'
        GROUP BY T.id, T.judul, T.sinopsis_trailer, T.url_video_trailer, T.release_date_trailer
        ORDER BY view DESC
        LIMIT 10
    `;
  return res;
}
