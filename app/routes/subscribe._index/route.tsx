import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/lib/ui/table";
import { Button } from "~/lib/ui/button"; // Adjust the path as per your project structure
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";
import { Link, useLoaderData } from "@remix-run/react";
import {
  getActiveSubscription,
  getSubcriptionPackage,
  getTransactionHistory,
} from "~/lib/repository/subscribe/subscribe.server";
import { PaymentMethod } from "~/lib/repository/subscribe/type";

export async function loader({ request }: LoaderFunctionArgs) {
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  let username = await getUserFromRequest(request);
  let activeSubscription = await getActiveSubscription({ username });
  let subcriptionPackage = await getSubcriptionPackage();
  let transactionHistory = await getTransactionHistory({ username });
  return json({
    username,
    activeSubscription,
    subcriptionPackage,
    transactionHistory,
  });
}

export default function SubscribePage() {
  let data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="relative w-full px-10 py-10 space-y-10">
        <h1 className="text-2xl font-bold text-center">
          Halaman Kelola Langganan
        </h1>
        <div className="space-y-5 flex flex-col">
          <p className="text-xl font-bold">Paket Langganan Aktif Anda:</p>
          {data.activeSubscription.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Nama</TableHead>
                  <TableHead className="text-center">Harga</TableHead>
                  <TableHead className="text-center">Resolusi Layar</TableHead>
                  <TableHead className="text-center">
                    Dukungan Perangkat
                  </TableHead>
                  <TableHead className="text-center">Tanggal Dimulai</TableHead>
                  <TableHead className="text-center">Tanggal Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.activeSubscription.map((table, index) => {
                  let start_date = new Date(table.start_date_time);
                  let start_date_format = `${start_date.getFullYear()}/${start_date.getMonth()}/${start_date.getDate()}`;
                  let end_date = new Date(table.end_date_time);
                  let end_date_format = `${end_date.getFullYear()}/${end_date.getMonth()}/${end_date.getDate()}`;
                  return (
                    <TableRow key={index}>
                      <TableCell className=" text-center">
                        {table.nama}
                      </TableCell>
                      <TableCell className=" text-center">
                        {table.harga}
                      </TableCell>
                      <TableCell className=" text-center">
                        {table.resolusi_layar}
                      </TableCell>
                      <TableCell className=" text-center">
                        {table.perangkat}
                      </TableCell>
                      <TableCell className=" text-center">
                        {start_date_format}
                      </TableCell>
                      <TableCell className=" text-center">
                        {end_date_format}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p>-</p>
          )}
        </div>

        <div className="space-y-5 flex flex-col">
          <p className="text-xl font-bold">Pilih Paket Lain:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nama</TableHead>
                <TableHead className="text-center">Harga</TableHead>
                <TableHead className="text-center">Resolusi Layar</TableHead>
                <TableHead className="text-center">
                  Dukungan Perangkat
                </TableHead>
                <TableHead className="text-center">Beli</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.subcriptionPackage.map((table, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className=" text-center">{table.nama}</TableCell>
                    <TableCell className=" text-center">
                      {table.harga}
                    </TableCell>
                    <TableCell className=" text-center">
                      {table.resolusi_layar}
                    </TableCell>
                    <TableCell className=" text-center">
                      {table.perangkat}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/buy/${table.nama}`}>
                        <Button type="submit">Beli</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col space-y-5">
          <p className="font-bold text-xl">Riwayat Transaksi:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nama Paket</TableHead>
                <TableHead className="text-center">Tanggal Dimulai</TableHead>
                <TableHead className="text-center">Tanggal Akhir</TableHead>
                <TableHead className="text-center">Metode Pembayaran</TableHead>
                <TableHead className="text-center">
                  Tanggal Pembayaran
                </TableHead>
                <TableHead className="text-center">Total Pembayaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.transactionHistory.map((table, index) => {
                let start_date = new Date(table.start_date_time);
                let start_date_format = `${start_date.getFullYear()}/${start_date.getMonth()}/${start_date.getDate()}`;
                let end_date = new Date(table.end_date_time);
                let end_date_format = `${end_date.getFullYear()}/${end_date.getMonth()}/${end_date.getDate()}`;
                let payment = "";
                switch (table.metode_pembayaran) {
                  case PaymentMethod.CREDIT_CARD:
                    payment = "Debit";
                    break;
                  case PaymentMethod.BANK_TRANSFER:
                    payment = "Transfer Bank";
                    break;
                  case PaymentMethod.E_WALLET:
                    payment = "E-Wallet";
                    break;
                  case PaymentMethod.DEBIT:
                    payment = "Debit";
                    break;
                  default:
                    payment = "Unknown";
                    break;
                }

                return (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      {table.nama_paket}
                    </TableCell>
                    <TableCell className="text-center">
                      {start_date_format}
                    </TableCell>
                    <TableCell className="text-center">
                      {end_date_format}
                    </TableCell>
                    <TableCell className="text-center">{payment}</TableCell>
                    <TableCell className="text-center">
                      {end_date_format}
                    </TableCell>
                    <TableCell className="text-center">{table.harga}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
