import { Button } from '~/lib/ui/button'; // Adjust the path as per your project structure


export default function DownloadSuccessPage() {
    return (
        <>
            <div className="HalamanSuksesDownloadTayangan" style={{ textAlign: 'center' }}>
            <h2 className="text-lg font-semibold mb-4">SUKSES MENAMBAHKAN TAYANGAN KE DAFTAR UNDUHAN</h2>
                <p>
                    Selamat! Anda telah berhasil mengunduh Interstellar dan akan 
                    berlaku hingga 2024/05/09. Cek informasi selengkapnya pada 
                    halaman daftar unduhan.
                </p>

                <div><Button>Daftar Unduhan</Button></div>
            </div>

        </>

    )

}