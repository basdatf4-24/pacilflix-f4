import sql from "~/lib/server/db.server";
import { validatePaymentMethod } from "./type";

export async function getActiveSubscription({
  username,
}: {
  username: string;
}) {
  let res = await sql`
      SELECT 
        T.USERNAME, 
        P.NAMA, 
        P.HARGA, 
        P.RESOLUSI_LAYAR, 
        STRING_AGG(DP.DUKUNGAN_PERANGKAT, ', ') AS PERANGKAT, 
        T.START_DATE_TIME, 
        T.END_DATE_TIME
      FROM 
        TRANSACTION T
      JOIN 
        PAKET P ON T.NAMA_PAKET = P.NAMA
      JOIN 
        DUKUNGAN_PERANGKAT DP ON P.NAMA = DP.NAMA_PAKET
      WHERE 
        T.USERNAME = ${username} 
        AND CURRENT_TIMESTAMP BETWEEN T.START_DATE_TIME AND T.END_DATE_TIME
      GROUP BY 
        T.USERNAME, P.NAMA, P.HARGA, P.RESOLUSI_LAYAR, T.START_DATE_TIME, T.END_DATE_TIME
      ORDER BY 
        T.TIMESTAMP_PEMBAYARAN DESC
      LIMIT 1
    `;
  return res;
}

export async function getSubcriptionPackage() {
  let res =
    await sql`SELECT P.NAMA, P.HARGA, P.RESOLUSI_LAYAR, STRING_AGG(DP.DUKUNGAN_PERANGKAT, ', ') AS PERANGKAT
    FROM PAKET P
    JOIN DUKUNGAN_PERANGKAT DP ON P.NAMA = DP.NAMA_PAKET
    GROUP BY 
      P.NAMA`;
  return res;
}

export async function getTransactionHistory({
  username,
}: {
  username: string;
}) {
  let res = await sql`SELECT T.USERNAME,
  T.NAMA_PAKET,
  T.START_DATE_TIME,
  T.END_DATE_TIME,
  T.METODE_PEMBAYARAN,
  TO_CHAR(T.TIMESTAMP_PEMBAYARAN, 'YYYY/MM/DD') AS TIMESTAMP_FORMAT,
  P.HARGA  
  FROM TRANSACTION T
  JOIN PAKET P ON T.NAMA_PAKET = P.NAMA
  WHERE T.USERNAME=${username}
  ORDER BY TIMESTAMP_PEMBAYARAN DESC`;
  return res;
}

export async function addNewPackage({
  username,
  packageName,
  paymentMethod,
}: {
  username: string;
  packageName: string;
  paymentMethod: string;
}) {
  let parsedPaymentMethod = validatePaymentMethod(paymentMethod);

  if (!parsedPaymentMethod) {
    throw new Error("Invalid payment method");
  }
  let res =
    await sql`INSERT INTO TRANSACTION (USERNAME, TIMESTAMP_PEMBAYARAN, NAMA_PAKET, START_DATE_TIME, END_DATE_TIME, METODE_PEMBAYARAN)
       VALUES (${username}, current_timestamp, ${packageName}, current_date, current_date + INTERVAL '1 month', ${paymentMethod})`;
  return res[0];
}

export async function getPackageDetail({
  packageName,
}: {
  packageName: string;
}) {
  let res =
    await sql`SELECT P.NAMA, P.HARGA, P.RESOLUSI_LAYAR, STRING_AGG(DP.DUKUNGAN_PERANGKAT, ', ') AS PERANGKAT
    FROM PAKET P
    JOIN DUKUNGAN_PERANGKAT DP ON P.NAMA = DP.NAMA_PAKET
    WHERE LOWER(P.NAMA) = LOWER(${packageName})
    GROUP BY 
      P.NAMA`;
  return res[0];
}
