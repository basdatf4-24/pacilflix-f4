import * as React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/lib/ui/table";
import { Button } from "~/lib/ui/button"; // Adjust the path as per your project structure
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";
import {
  addNewPackage,
  getPackageDetail,
} from "~/lib/repository/subscribe/subscribe.server";
import {
  jsonWithError,
  redirectWithError,
  redirectWithSuccess,
} from "remix-toast";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/lib/ui/select";
import { PostgresError } from "postgres";
export async function loader({ request, params }: LoaderFunctionArgs) {
  if (
    params.paketName === "" ||
    !params.paketName ||
    params.paketName === null
  ) {
    return redirectWithError("/subscribe", "Paket tidak ditemukan");
  }

  let redirect = await getAuthUser(request);
  if (redirect) return redirect;

  console.log(params.paketName);

  let username = await getUserFromRequest(request);
  let packageData = await getPackageDetail({
    packageName: params.paketName,
  });

  if (!packageData) {
    return redirectWithError("/subscribe", "Paket tidak ditemukan");
  }

  return {
    username,
    packageData,
    packageName: params.paketName,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData.entries());
  let username = String(data.username || "");
  let packageName = String(data.packageName || "");
  let paymentMethod = String(data.paymentMethod || "");

  if (!username || !packageName) {
    return jsonWithError({ success: false }, "Opps! Data tidak lengkap");
  }

  if (!paymentMethod) {
    return jsonWithError(
      { success: false },
      "Opps! Kamu belum memilih metode pembayaran"
    );
  }

  try {
    await addNewPackage({
      username,
      packageName,
      paymentMethod,
    });

    return redirectWithSuccess(
      "/subscribe",
      `Sukses membeli paket ${packageName}`
    );
  } catch (e) {
    let err = e as PostgresError;
    return jsonWithError({ success: false }, `${err.message}`);
  }
}

export default function PaymentPage() {
  let fetcher = useFetcher();
  let { username, packageData, packageName } = useLoaderData<typeof loader>();
  return (
    <div className="w-full flex flex-col space-y-5 px-10 py-10">
      <h1 className="text-2xl font-bold text-center">Halaman Beli</h1>
      <h2 className="text-xl fone-semibold">
        Informasi Paket yang Ingin Dibeli:
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Nama</TableHead>
            <TableHead className="text-center">Harga</TableHead>
            <TableHead className="text-center">Resolusi Layar</TableHead>
            <TableHead className="text-center">Dukungan Perangkat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center font-bold">
              {packageData.nama}
            </TableCell>
            <TableCell className="text-center font-bold">
              {packageData.harga}
            </TableCell>
            <TableCell className="text-center font-bold">
              {packageData.resolusi_layar}
            </TableCell>
            <TableCell className="text-center">
              {packageData.perangkat}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="space-y-5">
        <h2 className="text-lg font-normal">Pilih metode pembayaran: </h2>
        <fetcher.Form className="w-full space-y-5" method="post">
          <Select name="paymentMethod">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Metode pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="BANK_TRANSFER">Transfer bank</SelectItem>
                <SelectItem value="CREDIT_CARD">Kartu kredit</SelectItem>
                <SelectItem value="E_WALLET">E-Wallet</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input type="hidden" name="packageName" value={packageName} />
          <input type="hidden" name="username" value={username} />
          <Button type="submit">Bayar</Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
