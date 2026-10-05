/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF lebih kecil dari WebP untuk foto. Peramban yang belum mendukungnya
    // otomatis menerima WebP, jadi tidak ada yang perlu dikorbankan.
    formats: ['image/avif', 'image/webp'],
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
