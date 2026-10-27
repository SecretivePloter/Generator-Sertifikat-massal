# Rilis paket mandiri 2.0.0 · 27 Oktober 2026

- Sumber generator dan aset: repository `SecretivePloter/absensi`, commit `17e1afc`.
- Nomor sertifikat berasal dari sheet `AUTOMATE`; validasi batch/registri berasal dari commit `92eafce` dan sudah termasuk dalam sumber terkini.
- Kalibrasi default di `public/sertifikat/config.js` mengikuti rilis Ichikara; URL dan key arsip lama tidak dibawa.
- `public/sertifikat/SHA256SUMS.txt` memuat checksum 34 aset statis. Periksa dengan `node scripts/verify-assets.mjs`.
- `supabase/migrations/` berisi schema awal dan revisi nomor Excel untuk database **baru**; production portal telah menggunakan migrasi tersebut.
- Paket tidak menyertakan workbook peserta, foto peserta, PDF uji, atau kredensial Supabase.
- Verifikasi: 7 tes parser lulus, build Vite 1824 modul lulus, login/validator/kalibrator terbuka, generator tunggal menghasilkan PDF 2 halaman, tanggal tanda tangan kedua halaman memuat Cikarang, dan tidak ada pageerror pada alur browser yang diuji.
- `npm ci` dari lockfile lulus. Audit dependensi production: 0 temuan. Empat temuan tersisa pada alat build/development Vite, esbuild, PostCSS dan parser CSS; jangan mengekspos dev server ke internet. Paket production disajikan dari `dist`.
- Alur login penerbitan dengan kredensial asli dan penerbitan batch pada domain mandiri belum diuji. Siapkan env vars dan login akun yang sudah masuk allowlist Supabase.
