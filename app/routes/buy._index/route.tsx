import * as React from "react";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/lib/ui/table";
import { Button } from '~/lib/ui/button'; // Adjust the path as per your project structure
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "~/lib/ui/dropdown-menu";
  


export default function PaymentPage() {
    return (
        <>
            <div className="HalamanBayar">
            <h2 className="text-lg font-semibold mb-4">Halaman Beli</h2>
                <p>
                    Informasi Paket yang Ingin Dibeli:
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nama</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead>Resolusi Layar</TableHead>
                            <TableHead>Dukungan Perangkat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Premium</TableCell>
                            <TableCell>100000</TableCell>
                            <TableCell>4K</TableCell>
                            <TableCell>Mobile, Tablet, Dekstop, Smart TV</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

                <div><DropdownMenuRadioGroupDemo /></div>

                <div><Button>Bayar</Button></div>
            </div>
            
       

        </>

    )

}

export function DropdownMenuRadioGroupDemo() {
    const [position, setPosition] = React.useState("bottom")
   
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Pilih Metode Pembayaran</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Metode Pembayaran</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">BANK TRANSFER</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">CREDIT</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">E-WALLET</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="left">DEBIT</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}