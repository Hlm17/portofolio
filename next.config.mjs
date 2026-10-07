/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF lebih kecil dari WebP untuk foto. Peramban yang belum mendukungnya
    // otomatis menerima WebP, jadi tidak ada yang perlu dikorbankan.
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      // Halaman profil hanya punya dua alamat: "/" untuk bahasa Indonesia dan
      // "/en" untuk bahasa Inggris. Alamat lama "/id" tetap diarahkan supaya
      // tautan yang sudah tersebar tidak menemui halaman kosong.
      {
        source: '/id',
        destination: '/',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        // Subdomain produk menampilkan halaman landing IngetDiWA sebagai halaman depan,
        // supaya alamat yang dipakai pengguna (dan pengajuan KYC Pakasir) bersih:
        //   https://ingetdiwa.hilmi.work
        // Halaman /ingetdiwa tetap bisa diakses langsung, termasuk dari hilmi.work.
        {
          source: '/',
          has: [{ type: 'host', value: 'ingetdiwa.hilmi.work' }],
          destination: '/ingetdiwa',
        },
      ],
    };
  },
};

export default nextConfig;
