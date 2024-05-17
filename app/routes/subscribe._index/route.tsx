import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/lib/ui/table";
import { Button } from '~/lib/ui/button'; // Adjust the path as per your project structure


export default function SubscribePage() {
    return (
        <>
        <div className="HalamanSubscribe">
            <h2 className="text-lg font-semibold mb-4">Halaman Kelola Langganan</h2>
            <div className="PaketAktif">
                <p>
                    Paket Langganan Aktif Anda:
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nama</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead>Resolusi Layar</TableHead>
                            <TableHead>Dukungan Perangkat</TableHead>
                            <TableHead >Tanggal Dimulai</TableHead>
                            <TableHead >Tanggal Akhir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Premium</TableCell>
                            <TableCell>100000</TableCell>
                            <TableCell>4K</TableCell>
                            <TableCell>Mobile, Tablet, Dekstop, Smart TV</TableCell>
                            <TableCell >2024/05/01</TableCell>
                            <TableCell >2024/06/01</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </div>
            
            <div className="PilihanPaket">
                <p>
                    Pilih Paket Lain:
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nama</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead>Resolusi Layar</TableHead>
                            <TableHead>Dukungan Perangkat</TableHead>
                            <TableHead >Beli</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Basic</TableCell>
                            <TableCell>25000</TableCell>
                            <TableCell>SD</TableCell>
                            <TableCell>Mobile, Tablet</TableCell>
                            <TableCell className=" table-cell">
                                <Button>Beli</Button>
                            </TableCell>

                        </TableRow>
                        
                        <TableRow>
                            <TableCell className="font-medium">Standard</TableCell>
                            <TableCell>50000</TableCell>
                            <TableCell>FHD</TableCell>
                            <TableCell>Mobile, Tablet, Dekstop</TableCell>
                            <TableCell className=" table-cell">
                                <Button>Beli</Button>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">Premium</TableCell>
                            <TableCell>100000</TableCell>
                            <TableCell>4K</TableCell>
                            <TableCell>Mobile, Tablet, Dekstop, Smart TV</TableCell>
                            <TableCell className=" table-cell">
                                <Button>Beli</Button>
                            </TableCell>
                        </TableRow>

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
                            <TableHead className="w-[100px]">Nama Paket</TableHead>
                            <TableHead >Tanggal Dimulai</TableHead>
                            <TableHead >Tanggal Akhir</TableHead>
                            <TableHead>Metode Pembayaran</TableHead>
                            <TableHead>Tanggal Pembayaran</TableHead>
                            <TableHead>Total Pembayaran</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                            <TableCell className="font-medium">Basic</TableCell>
                            <TableCell >2024/02/29</TableCell>
                            <TableCell >2024/03/29</TableCell>
                            <TableCell>DEBIT</TableCell>
                            <TableCell>2024/02/29</TableCell>
                            <TableCell>25000</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Standard</TableCell>
                            <TableCell >2024/03/30</TableCell>
                            <TableCell >2024/04/30</TableCell>
                            <TableCell>DEBIT</TableCell>
                            <TableCell>2024/03/30</TableCell>
                            <TableCell>50000</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </div>
        </div>

        </>

    )

}