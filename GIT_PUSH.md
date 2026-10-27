# Git push mandiri

Folder ini adalah paket terpisah dan belum memiliki remote Git. Buat repository GitHub **kosong** (tanpa README/.gitignore otomatis), salin URL HTTPS-nya, lalu jalankan di PowerShell:

```powershell
Set-Location 'A:\PERSONAL PROJECT\Generator Sertifikat Massal'
git init -b main
git add .
git status --short
git commit -m "Release standalone certificate generator 2.0"
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Ganti `USERNAME/NAMA-REPO` dengan repository milik tuan Muda. Pastikan `git status --short` tidak menampilkan `.env.local`, `node_modules`, `dist`, foto peserta, workbook peserta, atau PDF/ZIP uji. Jika folder ini nantinya sudah memiliki remote, cek dengan `git remote -v` dan gunakan `git push origin main` untuk perubahan berikutnya. Push kode tidak otomatis mengisi environment variable atau migrasi Supabase pada hosting baru.
