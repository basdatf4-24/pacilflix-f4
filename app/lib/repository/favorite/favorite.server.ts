import sql from "~/lib/server/db.server";

export async function getListFavorite({ username }: { username: string }) {
  let res = await sql`SELECT * FROM DAFTAR_FAVORIT WHERE USERNAME=${username}`;
  return res;
}

export async function deleteFavorite({
  username,
  timestamp,
}: {
  username: string;
  timestamp: string;
}) {
  let res =
    await sql`DELETE FROM tayangan_memiliki_daftar_favorit WHERE USERNAME=${username} AND TIMESTAMP=${timestamp}`;
  res =
    await sql`DELETE FROM DAFTAR_FAVORIT WHERE USERNAME=${username} AND TIMESTAMP=${timestamp}`;
  return res;
}

export async function getFavoriteDetail({
  username,
  timestamp,
}: {
  username: string;
  timestamp: string;
}) {
  let res =
    await sql`SELECT t.*, ft.*, f.judul as judul_daftar_favorit FROM TAYANGAN_MEMILIKI_DAFTAR_FAVORIT ft JOIN 
    TAYANGAN t ON t.id = ft.id_tayangan JOIN DAFTAR_FAVORIT f ON f.timestamp = ft.timestamp AND f.username = ft.username WHERE ft.username = ${username} AND ft.timestamp = ${timestamp}`;
  return res;
}

export async function deleteFromDaftarFavorit({
  username,
  timestamp,
  idTayangan,
}: {
  username: string;
  timestamp: string;
  idTayangan: string;
}) {
  let res =
    await sql`DELETE FROM TAYANGAN_MEMILIKI_DAFTAR_FAVORIT WHERE USERNAME=${username} AND TIMESTAMP=${timestamp} AND ID_TAYANGAN=${idTayangan}`;
  return res;
}

export async function createFavorite({
  username,
  title,
}: {
  username: string;
  title: string;
}) {
  let timestamp = new Date().toString();
  let res =
    await sql`INSERT INTO DAFTAR_FAVORIT (USERNAME, JUDUL, TIMESTAMP) VALUES (${username}, ${title}, ${timestamp})`;
  return res;
}

export async function addFavoriteToFavoriteList({
  username,
  timestamp,
  showId,
}: {
  username: string;
  timestamp: string;
  showId: string;
}) {
  let res =
    await sql`INSERT INTO TAYANGAN_MEMILIKI_DAFTAR_FAVORIT (USERNAME, TIMESTAMP, ID_TAYANGAN) VALUES (${username}, ${timestamp}, ${showId})`;
  return res;
}

export async function getFavoriteList({ username }: { username: string }) {
  let res = await sql`SELECT * FROM DAFTAR_FAVORIT WHERE USERNAME=${username}`;
  return res;
}
