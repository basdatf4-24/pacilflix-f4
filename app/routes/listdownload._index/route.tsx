import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/lib/ui/table";
import { Button } from '~/lib/ui/button'; // Adjust the path as per your project structure


export default function ListDownloadPage() {
    return (
        <>
        <div className="HalamanDaftarUnduhan">
            <h2 className="text-lg font-semibold mb-4">Halaman Daftar Unduhan</h2>
                       
            <div className="PilihanPaket">
            
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead colSpan={3}>Daftar Unduhan</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead className="w-[100px]">Judul</TableHead>
                            <TableHead>Waktu Diunduh</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">The Fall Guy</TableCell>
                            <TableCell>2024/05/02</TableCell>
                            <TableCell className=" table-cell">
                                <Button>Hapus</Button>
                            </TableCell>

                        </TableRow>
                        
                        <TableRow>
                            <TableCell className="font-medium">Dune: Part Two</TableCell>
                            <TableCell>2024/05/02</TableCell>
                            <TableCell className=" table-cell">
                                <Button>Hapus</Button>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">Exhuma</TableCell>
                            <TableCell>2024/05/02</TableCell>
                            <TableCell className=" table-cell">
                                <Button>Hapus</Button>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-medium">Interstellar</TableCell>
                            <TableCell>2024/05/02</TableCell>
                            <TableCell className=" table-cell">
                                <Button>Hapus</Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </div>
            
            
        </div>

        </>

    )

}