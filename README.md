# Generator Sertifikat Ichikara · Paket mandiri 2.0

Paket ini berisi generator massal terbaru, generator tunggal, alat kalibrasi, template SVG/font lokal, dan validator publik. Paket lama di `APP ICHIKARA/packaging/certificate-generator` adalah versi 1.0 yang belum mendukung alur AUTOMATE terbaru. Paket ini tidak memuat modul absensi QR.

## Mulai lokal

Persyaratan: Node.js 20+, npm, dan akses ke proyek Supabase sertifikat Ichikara untuk login/penerbitan. Dari folder paket:

```powershell
Copy-Item .env.example .env.local
notepad .env.local
npm install
npm run dev
```

Isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dengan URL proyek serta **publishable/anon key**, bukan `service_role` atau secret. URL project production yang digunakan portal adalah `https://pfvlxlfykdabrwijqqxa.supabase.co`. Key publik dapat diambil dari Supabase Dashboard → Project Settings → API. Jangan commit `.env.local`.

Buka URL yang ditampilkan Vite, lalu login dengan akun yang sudah diberi izin penerbitan. Validator berada di `/validasi-sertifikat` tanpa login. Generator/kalibrator tunggal juga tersedia di `/sertifikat/index.html` dan `/sertifikat/adjust.html`.

## Impor massal

Pilih satu folder berisi **satu file Excel** dan foto JPG/PNG/WebP. Sistem membaca hanya sheet `AUTOMATE` dan tabel `TABEL UNTUK BULK GENERATOR`: Nomor Sertifikat, kelas, NAMA, Tempat, serta Bunpou, Kaiwa, Dokkai, Absensi, Nilai. Nomor, kelas pada nomor, tanggal terbit, nama uppercase, TTL, dan nilai diambil dari master. Nama foto dibandingkan tanpa membedakan kapital dan spasi berulang; salah eja harus diperbaiki/manual dipilih. Periksa semua data, unduh ZIP pratinjau, kemudian terbitkan.

Nomor Excel dipakai persis dan diperiksa ke registri. Pratinjau berlabel PRATINJAU tidak mendaftarkan nomor. Sertifikat resmi baru muncul di validator setelah seluruh batch selesai dicatat. ZIP PDF/manifest harus disimpan oleh admin; PDF dan foto tidak diarsipkan oleh paket ini. Tanggal tanda tangan di kedua halaman berformat `Cikarang, 20 Oktober 2026` menurut tanggal pada nomor.

## Deploy

`npm run build` menghasilkan folder `dist`. Deploy **seluruh hasil build** ke root domain/subdomain tersendiri. `vercel.json` memberi fallback SPA untuk `/sertifikat-admin` dan `/validasi-sertifikat`, sementara `/sertifikat/index.html` tetap file statis. Isi dua environment variable di hosting lalu rebuild. Gunakan HTTPS agar unggah foto, Web Crypto, dan login bekerja. Jangan ubah prefix `/sertifikat` tanpa menyesuaikan path iframe di komponen.

Jalankan `npm run dev` hanya di komputer lokal. Untuk hosting gunakan build `dist`; development dependencies dari Vite masih memiliki advisori audit, sementara audit dependensi production pada paket ini nol temuan saat rilis.

Paket memakai registri Supabase production yang sama dengan portal, termasuk `certificate_private` dan fungsi `certificate_batch`/`certificate_verify`. Migrasi ada di `supabase/migrations/`; pada proyek database lain, jalankan migrasi melalui administrator setelah audit, buat allowlist publisher, dan arahkan `.env.local` ke proyek tersebut. Jangan menjalankan ulang migrasi pada project production yang sudah menggunakannya.

## Periksa sebelum digunakan

```powershell
npm test
npm run build
```

Setelah deploy: buka login admin, validator publik, kalibrator, lalu buat pratinjau satu sertifikat dengan foto sample. Untuk uji massal tanpa menerbitkan nomor, gunakan **Unduh ZIP pratinjau**. Jangan memakai tombol terbitkan dengan data uji karena nomor resmi akan tercatat.

Paket memakai kode dari commit portal `17e1afc` untuk generator dan revisi nomor master `92eafce`. Panduan Git push mandiri ada di `GIT_PUSH.md`.
