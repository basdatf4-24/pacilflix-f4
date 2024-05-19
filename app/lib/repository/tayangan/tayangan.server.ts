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

    let results = await sql`
        SELECT T.id, T.judul, T.sinopsis_trailer, T.url_video_trailer, T.release_date_trailer, count(RN) AS view
        FROM TAYANGAN T 
        LEFT OUTER JOIN RIWAYAT_NONTON RN ON RN.id_tayangan = T.id AND current_timestamp - RN.start_date_time < interval '7 days'
        GROUP BY T.id, T.judul, T.sinopsis_trailer, T.url_video_trailer, T.release_date_trailer
        ORDER BY view DESC
        LIMIT 10;
    `;
    return results;
  }

export async function getTopTayanganRegionalThisWeek({
    username
}: {
    username:string;
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