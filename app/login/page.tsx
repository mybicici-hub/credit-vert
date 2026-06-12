"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    await new Promise((res) => setTimeout(res, 900))

    const ok = login(email, password)
    if (ok) {
      router.push("/dashboard")
    } else {
      setError("Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#007A53] h-14 flex items-center px-6 flex-shrink-0">
        <a href="/" className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#007A53] text-xs font-black">CA</span>
          </div>
          <span className="font-heading font-bold text-white text-lg tracking-tight">
            Crédit Agricole
          </span>
        </a>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            {/* Card header */}
            <div className="bg-[#007A53] px-8 py-7">
              <div className="size-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                <Lock className="size-7 text-white" />
              </div>
              <h1 className="font-heading font-bold text-2xl text-white">
                Accès à votre espace
              </h1>
              <p className="text-white/75 text-sm mt-1">
                Connectez-vous à votre compte Crédit Agricole
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="px-8 py-8 flex flex-col gap-5">
              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                  role="alert"
                >
                  <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
                  {error}
                </motion.div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    className="text-xs text-[#007A53] hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors placeholder:text-muted-foreground/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="size-4 rounded border-border accent-[#007A53]"
                />
                <span className="text-sm text-muted-foreground">Rester connecté(e)</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full flex items-center justify-center gap-2 bg-[#007A53] hover:bg-[#009E6D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Connexion en cours…
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">ou</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <a
                href="/"
                className="w-full flex items-center justify-center border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Retour au site
              </a>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            Vos données sont protégées par un chiffrement SSL 256 bits.<br />
            Crédit Agricole SA — Agréé ACPR — Garantie des dépôts FGDR
          </p>
        </motion.div>
      </main>
    </div>
  )
}
