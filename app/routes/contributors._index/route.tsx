import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/lib/ui/table";
import { useSubmit, useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getAuthUser, getUserFromRequest } from "~/lib/server/auth.server";
import {
  getContributor,
  getContributorByTpe,
} from "~/lib/repository/contributor/contributor.server";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/lib/ui/select";
import { Button } from "~/lib/ui/button";

interface LoaderInterface {
  username: string;
  filterBy: string;
  contributors: {
    id: string;
    nama: string;
    jenis_kelamin: string;
    kewarganegaraan: string;
    type: string | null;
  }[];
}

export async function loader({ request }: LoaderFunctionArgs) {
  let filterBy = new URL(request.url).searchParams.get("filterBy");
  let redirect = await getAuthUser(request);
  if (redirect) return redirect;
  let username = await getUserFromRequest(request);

  if (filterBy) {
    let contributors = await getContributorByTpe(filterBy);
    return json({ username, filterBy, contributors: contributors });
  }

  let contributors = await getContributor();

  return json({ username, filterBy, contributors });
}

export default function ContributorsPage() {
  let submit = useSubmit();
  let data = useLoaderData<LoaderInterface>();
  return (
    <div className="relative w-full px-10 py-10 flex flex-col space-y-6">
      <h2 className="text-2xl font-semibold">Daftar Kontributor</h2>
      <div className="space-y-2">
        <p className="font-semibold">Filter</p>
        <div className="flex flex-row space-x-6">
          <Select
            name="filterBy"
            onValueChange={(value) => {
              const formData = new FormData();
              formData.append("filterBy", value);
              submit(formData, { method: "get" });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipe Kontributor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="SUTRADARA">Sutradara</SelectItem>
                <SelectItem value="PEMAIN">Pemain</SelectItem>
                <SelectItem value="PENULIS_SKENARIO">
                  Penulis Skenario
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="destructive"
            onClick={() => {
              submit(new FormData(), { method: "get" });
            }}
          >
            Reset
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Kewarganegaraan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.contributors.map((contributor, index) => {
            let { nama, jenis_kelamin, kewarganegaraan, type } = contributor;
            let contributorType: string | null = null;
            switch (type) {
              case "PEMAIN":
                contributorType = "Pemain";
                break;
              case "PENULIS_SKENARIO":
                contributorType = "Penulis Skenario";
                break;
              case "SUTRADARA":
                contributorType = "Sutradara";
                break;
            }
            jenis_kelamin = jenis_kelamin === "0" ? "Laki-laki" : "Perempuan";
            return (
              contributorType !== null && (
                <TableRow key={index}>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{contributorType}</TableCell>
                  <TableCell>{jenis_kelamin}</TableCell>
                  <TableCell>{kewarganegaraan}</TableCell>
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
