# hilmi.work

Website pribadi **Muhammad Hilmi Rajwandhika** (Next.js 14 App Router) yang juga menjadi
rumah produk **IngetDiWA** — bot pengingat & daftar tugas berbasis WhatsApp.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
```

Build produksi:

```bash
npm run build
npm start
```

## Peta halaman

| Rute | Isi |
|---|---|
| `/` | Halaman profil + kartu produk IngetDiWA |
| `/ingetdiwa` | Landing page produk IngetDiWA (fitur, cara kerja, harga, FAQ) |
| `/ingetdiwa/langganan` | Checkout langganan Rp3.000 / 30 hari (terintegrasi Pakasir) |
| `/ingetdiwa/langganan/sukses` | Instruksi setelah pembayaran |
| `/ingetdiwa/privasi` | Kebijakan Privasi |
| `/ingetdiwa/syarat` | Syarat & Ketentuan |
| `POST /api/pakasir/create` | Proxy server-side ke Pakasir API v2 |

## Integrasi Pakasir

Checkout di `/ingetdiwa/langganan` tidak menaruh kredensial di browser. Form mengirim
nomor WhatsApp ke `/api/pakasir/create`, lalu route server yang memanggil
`POST https://app.pakasir.com/api/v2/create-transaction/{slug}/{order_id}` dengan header
`X-Api-Key` dan body `{ method: "payment_link", amount: 3000 }`.

`order_id` yang dipakai adalah `SUB-<nomor>-<YYYYMM>` — **format yang sama** dengan bot
WAbot di server. Artinya webhook Pakasir yang sudah dikonfigurasi ke server bot otomatis
mengaktifkan langganan, baik user membayar lewat chat bot maupun lewat website.

### Environment variable (Vercel → Settings → Environment Variables)

| Variabel | Wajib | Keterangan |
|---|---|---|
| `PAKASIR_SLUG` | ya | Slug proyek dari Detail Proyek Pakasir |
| `PAKASIR_API_KEY` | ya | API key proyek dari Detail Proyek Pakasir |
| `PAKASIR_API_BASE` | tidak | Bawaan `https://app.pakasir.com/api/v2` |
| `PAKASIR_SUBSCRIPTION_AMOUNT` | tidak | Bawaan `3000` |
| `NEXT_PUBLIC_SITE_URL` | tidak | Bawaan `https://ingetdiwa.hilmi.work` — dipakai untuk canonical URL & metadata |

Salin `.env.example` → `.env.local` untuk pengembangan lokal. Jika `PAKASIR_SLUG` atau
`PAKASIR_API_KEY` kosong, endpoint checkout membalas **503** dengan pesan ramah dan tidak
membuat transaksi.

## Deploy

Repo ini di-deploy otomatis oleh Vercel pada setiap push ke branch `main`.

Domain:

- `hilmi.work` — halaman profil.
- `ingetdiwa.hilmi.work` — halaman produk & checkout (domain yang dipakai untuk pengajuan KYC Pakasir).

Kedua domain diarahkan ke project Vercel yang sama; tambahkan `ingetdiwa.hilmi.work` di
**Vercel → Project → Settings → Domains**, lalu buat CNAME di registrar sesuai instruksi
Vercel.
