import Link from 'next/link'

export default function Home() {
  return (
    <div>
        <h1>Selamat Datang di Website Saya!</h1>
        <p>Ini adalah halaman utama.</p>
        <Link href="/about">
            Tentang Kami
        </Link>
    </div>
  );
}
