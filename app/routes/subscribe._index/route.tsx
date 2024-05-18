import {
    Table, 
    TableHeader, 
    TableRow, 
    TableHead, 
    TableBody, 
    TableCell
} from "~/lib/ui/table";
import { Button } from '~/lib/ui/button'; // Adjust the path as per your project structure
import {
    type ActionFunctionArgs,
    json,
    type LoaderFunctionArgs,
  } from "@remix-run/node";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import {
    getActiveSubscription,
    getSubcriptionPackage,
    getTransactionHistory,
    addNewPackage
  } from "~/lib/repository/subscribe/subscribe.server";

export async function loader({ request }: LoaderFunctionArgs) {
    let redirect = await getAuthUser(request);
    if (redirect) return redirect;
    let username = await getUserFromRequest(request);
    let activeSubscription = await getActiveSubscription({ username });
    let subcriptionPackage = await getSubcriptionPackage();
    let transactionHistory = await getTransactionHistory({ username });
    return json({ username, activeSubscription, subcriptionPackage, transactionHistory });
}

export async function action({ request }: ActionFunctionArgs) {
    let form = await request.formData();
    let username = String(form.get("username") || "");
    let timestamp = String(form.get("timestamp") || "");
    let nama = String(form.get("nama") || "");
    
    if (username === "" || timestamp === "" || nama === "") {
        return json({ error: true });
    }

    try {
        // Assuming addNewPackage is defined and accepts username, nama, and timestamp
        await addNewPackage({
            username,
            nama,
            timestamp,
        });

        return jsonWithSuccess({}, `Sukses beli ${nama}`);
    } catch (error) {
        // Handle the error from addNewPackage
        return jsonWithError({}, "Oops! Terjadi kesalahan saat menambah paket.");
    }
}


export default function SubscribePage() {
    let fetcher = useFetcher();
    let data = useLoaderData<typeof loader>();
    return (
        <>
        <div className="HalamanSubscribe">
            <h1 className="text-lg font-semibold mb-4">Halaman Kelola Langganan</h1>
            <div className="PaketAktif">
                <p>
                    Paket Langganan Aktif Anda:
                </p>
                
                {data.activeSubscription.length > 0 ? (
                    <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Nama</TableHead>
                            <TableHead className="text-center">Harga</TableHead>
                            <TableHead className="text-center">Resolusi Layar</TableHead>
                            <TableHead className="text-center">Dukungan Perangkat</TableHead>
                            <TableHead className="text-center">Tanggal Dimulai</TableHead>
                            <TableHead className="text-center">Tanggal Akhir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.activeSubscription.map((table, index) => {
                            let start_date = new Date(table.T.START_DATE_TIME);
                            let start_date_format = `${start_date.getFullYear()}/${start_date.getMonth()}/${start_date.getDate()}`;
                            let end_date = new Date(table.T.END_DATE_TIME);
                            let end_date_format = `${end_date.getFullYear()}/${end_date.getMonth()}/${end_date.getDate()}`;
                            return (
                                <TableRow key={index}>
                                    <TableCell className=" text-center">{table.P.NAMA}</TableCell>
                                    <TableCell className=" text-center">{table.P.HARGA}</TableCell>
                                    <TableCell className=" text-center">{table.P.RESOLUSI_LAYAR}</TableCell>
                                    <TableCell className=" text-center">{table.PERANGKAT}</TableCell>
                                    <TableCell className=" text-center">{start_date_format}</TableCell>
                                    <TableCell className=" text-center">{end_date_format}</TableCell>
                                </TableRow>
                            );
                        })}

                    </TableBody>
                </Table>

                ) : (
                    <p>-</p>
                  )}
                
            </div>
            
            <div className="PilihanPaket">
                <p>
                    Pilih Paket Lain:
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Nama</TableHead>
                            <TableHead className="text-center">Harga</TableHead>
                            <TableHead className="text-center">Resolusi Layar</TableHead>
                            <TableHead className="text-center">Dukungan Perangkat</TableHead>
                            <TableHead className="text-center">Beli</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.subcriptionPackage.map((table, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className=" text-center">{table.P.NAMA}</TableCell>
                                    <TableCell className=" text-center">{table.P.HARGA}</TableCell>
                                    <TableCell className=" text-center">{table.P.RESOLUSI_LAYAR}</TableCell>
                                    <TableCell className=" text-center">{table.PERANGKAT}</TableCell>
                                    <TableCell className=" table-cell">
                                        <fetcher.Form method="post">
                                            <input
                                                type="hidden"
                                                value={data.username}
                                                name="username"
                                            />
                                            <input
                                                type="hidden"
                                                value={table.nama}
                                                name="nama"
                                            />
                                            <Button type="submit">Beli</Button>
                                        </fetcher.Form>
                                        <Link to={`/buy`}>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </div>
            
            <div className="RiwayatTransaksi">
                <p>
                    Riwayat Transaksi:
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Nama Paket</TableHead>
                            <TableHead className="text-center">Tanggal Dimulai</TableHead>
                            <TableHead className="text-center">Tanggal Akhir</TableHead>
                            <TableHead className="text-center">Metode Pembayaran</TableHead>
                            <TableHead className="text-center">Tanggal Pembayaran</TableHead>
                            <TableHead className="text-center">Total Pembayaran</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.transactionHistory.map((table, index) => {
                            let start_date = new Date(table.T.START_DATE_TIME);
                            let start_date_format = `${start_date.getFullYear()}/${start_date.getMonth()}/${start_date.getDate()}`;
                            let end_date = new Date(table.T.END_DATE_TIME);
                            let end_date_format = `${end_date.getFullYear()}/${end_date.getMonth()}/${end_date.getDate()}`;

                            return (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{table.T.NAMA_PAKET}</TableCell>
                                    <TableCell className="text-center">{start_date_format}</TableCell>
                                    <TableCell className="text-center">{end_date_format}</TableCell>
                                    <TableCell className="text-center">{table.T.METODE_PEMBAYARAN}</TableCell>
                                    <TableCell className="text-center">{table.TIMESTAMP_FORMAT}</TableCell>
                                    <TableCell className="text-center">{table.P.HARGA}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </div>
        </div>

        </>

    )

}