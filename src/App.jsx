import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { isConfigured, supabase } from './lib/supabase'
import Sertifikat from './pages/Sertifikat'
import CertificateVerify from './pages/CertificateVerify'

function Login({ session }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  if (session) return <Navigate to="/sertifikat-admin" replace />
  return <main className="min-h-screen bg-background px-4 py-12 text-foreground"><div className="mx-auto max-w-md space-y-6">
    <h1 className="text-3xl font-bold">Login penerbit sertifikat</h1>
    <p className="text-sm text-muted-foreground">Gunakan akun Ichikara yang memiliki izin penerbitan. Izin diperiksa lagi oleh server.</p>
    {!isConfigured && <p role="alert" className="rounded-md border border-red-300 p-3 text-red-700">Konfigurasi Supabase belum diisi. Lihat README.md.</p>}
    <form className="space-y-4 rounded-xl border bg-card p-5" onSubmit={async e => {
      e.preventDefault(); setBusy(true); setError('')
      try { const { error: loginError } = await supabase.auth.signInWithPassword({ email, password }); if (loginError) throw loginError; navigate('/sertifikat-admin') }
      catch (cause) { setError(cause.message || 'Login gagal.') }
      finally { setBusy(false) }
    }}>
      <label className="block text-sm">Email<input className="mt-1 w-full rounded-md border bg-background p-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username" required /></label>
      <label className="block text-sm">Password<input className="mt-1 w-full rounded-md border bg-background p-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required /></label>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button className="w-full rounded-md bg-primary p-3 font-medium text-primary-foreground disabled:opacity-50" disabled={busy || !isConfigured}>{busy ? 'Masuk…' : 'Masuk'}</button>
    </form>
    <Link className="text-sm text-primary underline" to="/validasi-sertifikat">Buka validator publik</Link>
  </div></main>
}

export default function App() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(!isConfigured)
  useEffect(() => {
    if (!supabase) return
    let active = true
    supabase.auth.getSession().then(({ data }) => { if (active) { setSession(data.session); setReady(true) } })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [])
  if (!ready) return <p className="p-8">Memeriksa sesi…</p>
  return <Routes>
    <Route path="/" element={<Navigate to="/sertifikat-admin" replace />} />
    <Route path="/login" element={<Login session={session} />} />
    <Route path="/validasi-sertifikat" element={<CertificateVerify />} />
    <Route path="/sertifikat-admin" element={session ? <><nav className="flex flex-wrap items-center justify-between gap-3 border-b bg-card px-4 py-3"><span className="font-semibold">Ichikara · Sertifikat</span><div className="flex gap-4 text-sm"><Link to="/validasi-sertifikat">Validator</Link><button onClick={() => supabase.auth.signOut()}>Keluar</button></div></nav><Sertifikat /></> : <Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/sertifikat-admin" replace />} />
  </Routes>
}
