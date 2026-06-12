"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from '@emailjs/browser'
import {
  Home,
  CreditCard,
  ArrowLeftRight,
  History,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  ChevronRight,
  Send,
  Download,
  Plus,
  Bell,
  TrendingUp,
  Shield,
  Smartphone,
  Lock,
  User,
  Globe,
  ChevronDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Wifi,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/auth"
import { VALID_USER } from "@/lib/auth"
import {
  getTransactions,
  getBalance,
  updateBalance,
  addTransaction,
  type Transaction,
} from "@/lib/store"
import { AIAssistant } from "@/components/ai-assistant"

type Tab = "accueil" | "carte" | "virements" | "historique" | "parametres"

const navItems: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "accueil", label: "Accueil", Icon: Home },
  { id: "carte", label: "Ma Carte", Icon: CreditCard },
  { id: "virements", label: "Virements", Icon: ArrowLeftRight },
  { id: "historique", label: "Historique", Icon: History },
  { id: "parametres", label: "Paramètres", Icon: Settings },
]

function formatAmount(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(n)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function TxIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    briefcase: <span className="text-base">💼</span>,
    "shopping-cart": <span className="text-base">🛒</span>,
    tv: <span className="text-base">📺</span>,
    home: <span className="text-base">🏠</span>,
    "arrow-down": <span className="text-base">⬇️</span>,
    zap: <span className="text-base">⚡</span>,
    heart: <span className="text-base">💊</span>,
    send: <span className="text-base">📤</span>,
    music: <span className="text-base">🎵</span>,
    utensils: <span className="text-base">🍽️</span>,
  }
  return <>{map[icon] ?? <span className="text-base">💳</span>}</>
}

function VisaCard() {
  const [flipped, setFlipped] = useState(false)
  const [showCVV, setShowCVV] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground text-center">
        Cliquez sur la carte pour la retourner
      </p>
      <div
        className="relative w-full max-w-sm cursor-pointer select-none"
        style={{ height: 200, perspective: 1200 }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        aria-label={flipped ? "Voir le recto de la carte" : "Voir le verso de la carte"}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#007A53] via-[#009E6D] to-[#00C684] p-6 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-widest">
                    Crédit Agricole
                  </p>
                  <p className="text-white font-semibold text-sm mt-0.5">Carte Visa Classic</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Wifi className="text-white/80 size-5 rotate-90" />
                  <div className="w-8 h-6 bg-yellow-300/90 rounded-sm" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-8 bg-yellow-300/90 rounded-md grid grid-cols-2 grid-rows-2 gap-px p-0.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-yellow-500/60 rounded-sm" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white font-mono text-xl tracking-[0.2em] font-semibold">
                  {VALID_USER.cardNumber}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mb-0.5">Titulaire</p>
                  <p className="text-white font-semibold text-sm tracking-wider uppercase">
                    {VALID_USER.prenom} {VALID_USER.nom}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mb-0.5">Expire</p>
                  <p className="text-white font-semibold text-sm">{VALID_USER.cardExpiry}</p>
                </div>
                <div className="text-white font-bold text-2xl italic tracking-tight">VISA</div>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#1F2937] to-[#374151] flex flex-col">
              <div className="w-full h-10 bg-black mt-6 flex-shrink-0" aria-hidden="true" />
              <div className="flex-1 px-6 py-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-9 bg-white/90 rounded flex items-center px-3">
                    <p className="text-gray-400 font-mono text-sm italic tracking-widest">
                      {VALID_USER.prenom.split(" ")[0]} {VALID_USER.nom}
                    </p>
                  </div>
                  <div className="bg-white rounded px-3 py-1.5 flex items-center gap-2">
                    <p className="text-[10px] text-gray-500 font-semibold">CVV</p>
                    <p className="font-mono font-bold text-gray-800 text-sm">
                      {showCVV ? VALID_USER.cardCVV : "•••"}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setShowCVV((s) => !s) }}
                      aria-label={showCVV ? "Masquer le CVV" : "Afficher le CVV"}
                      className="text-[#007A53]"
                    >
                      {showCVV ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-auto">
                  <p className="text-white/50 text-[10px]">IBAN : {VALID_USER.iban}</p>
                  <p className="text-white/50 text-[10px]">BIC : {VALID_USER.bic} — Crédit Agricole SA</p>
                  <p className="text-white/40 text-[9px] leading-tight">
                    Cette carte est la propriété de Crédit Agricole SA.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 flex justify-end">
                <span className="text-white font-bold text-2xl italic tracking-tight">VISA</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-2">
        {[
          { label: "Numéro", value: VALID_USER.cardNumber },
          { label: "Expiration", value: VALID_USER.cardExpiry },
          { label: "Titulaire", value: `${VALID_USER.prenom} ${VALID_USER.nom}`, full: true },
          { label: "Type", value: "Visa Classic" },
          { label: "Statut", value: "Active", accent: true },
        ].map((item) => (
          <div key={item.label} className={cn("bg-[#F5F7F8] rounded-xl px-4 py-3", item.full ? "col-span-2" : "")}>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
            <p className={cn("font-semibold text-sm mt-0.5", item.accent ? "text-[#007A53]" : "text-foreground")}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Transfer form ───────────────────────────────────────────────────────────
function TransferForm({ balance, onSuccess }: { balance: number; onSuccess: (newBal: number, tx: Omit<Transaction, "id">) => void }) {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [montant, setMontant] = useState("")
  const [iban, setIban] = useState("")
  const [motif, setMotif] = useState("")
  const [step, setStep] = useState<"form" | "confirm" | "success">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const amount = parseFloat(montant.replace(",", "."))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!nom || !prenom || !email || !iban) {
      setError("Veuillez remplir tous les champs obligatoires.")
      return
    }

    if (!email.includes("@")) {
      setError("L'adresse email n'est pas valide.")
      return
    }

    if (iban.trim().length < 15) {
      setError("Veuillez saisir un IBAN valide.")
      return
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Veuillez saisir un montant valide.")
      return
    }

    if (amount > balance) {
      setError("Solde insuffisant pour effectuer ce virement.")
      return
    }

    setStep("confirm")
  }

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))

    const newBal = balance - amount
    const tx: Omit<Transaction, "id"> = {
      date: new Date().toISOString().split("T")[0],
      label: `Virement vers ${prenom} ${nom}${motif ? " — " + motif : ""}`,
      amount: -amount,
      type: "debit",
      category: "Virement émis",
      icon: "send",
    }
    onSuccess(newBal, tx)

    // ✅ Envoi email EmailJS
    try {
      await emailjs.send(
        'service_bto8ldk',
        'template_rx8tb9l',
        {
          to_name: `${prenom} ${nom}`,
          to_email: email,
          sender_name: `${VALID_USER.prenom} ${VALID_USER.nom}`,
          sender_account: VALID_USER.iban,
          amount: amount.toFixed(2),
          reference: motif || 'Virement bancaire',
          transaction_date: new Date().toLocaleString('fr-FR'),
        },
        'eDVwT0iPpf-YLcJln'
      )
    } catch (err) {
      console.error('Email non envoyé:', err)
    }

    setStep("success")
    setLoading(false)
  }

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 py-10 text-center"
      >
        <div className="size-20 rounded-full bg-[#E8F5EF] flex items-center justify-center">
          <CheckCircle2 className="size-10 text-[#007A53]" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-xl text-foreground">Virement effectué !</h3>
          <p className="text-muted-foreground text-sm mt-1">
            {formatAmount(amount)} ont été envoyés à {prenom} {nom}
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Un email de confirmation a été envoyé à {email}
          </p>
        </div>
        <button
          onClick={() => { setStep("form"); setNom(""); setPrenom(""); setEmail(""); setMontant(""); setMotif("") }}
          className="px-6 py-2.5 bg-[#007A53] text-white rounded-xl text-sm font-semibold hover:bg-[#009E6D] transition-colors"
        >
          Nouveau virement
        </button>
      </motion.div>
    )
  }

  if (step === "confirm") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-5"
      >
        <div className="bg-[#F5F7F8] rounded-2xl p-5 flex flex-col gap-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Récapitulatif du virement</p>
          {[
            { label: "Bénéficiaire", value: `${prenom} ${nom}` },
            { label: "Email", value: email },
            { label: "Montant", value: formatAmount(amount) },
            ...(motif ? [{ label: "Motif", value: motif }] : []),
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center border-b border-border last:border-0 pb-2 last:pb-0">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm font-semibold text-foreground">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-1">
            <span className="text-sm text-muted-foreground">Solde après virement</span>
            <span className="text-sm font-bold text-[#007A53]">{formatAmount(balance - amount)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setStep("form")}
            className="flex-1 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
          >
            Modifier
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#007A53] text-white rounded-xl text-sm font-semibold hover:bg-[#009E6D] disabled:opacity-60 transition-colors"
          >
            {loading ? <><Loader2 className="size-4 animate-spin" /> Envoi…</> : "Confirmer le virement"}
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700" role="alert">
          <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Nom <span className="text-red-500">*</span></label>
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom du bénéficiaire"
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Prénom <span className="text-red-500">*</span></label>
          <input
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom du bénéficiaire"
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">Email du bénéficiaire <span className="text-red-500">*</span></label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="beneficiaire@email.com"
          className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">IBAN du bénéficiaire <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
          className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">Montant (€) <span className="text-red-500">*</span></label>
        <div className="relative">
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            placeholder="0,00"
            className="w-full px-4 pr-10 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">€</span>
        </div>
        <p className="text-xs text-muted-foreground">Solde disponible : {formatAmount(balance)}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">
          Motif <span className="text-muted-foreground font-normal">(optionnel)</span>
        </label>
        <input
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          placeholder="Ex : remboursement dîner"
          className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 mt-1 py-3.5 bg-[#007A53] text-white font-semibold rounded-xl text-sm hover:bg-[#009E6D] transition-colors"
      >
        <Send className="size-4" />
        Continuer
      </button>
    </form>
  )
}

function QuickAction({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-border hover:border-[#007A53]/40 hover:shadow-sm hover:shadow-[#007A53]/10 transition-all group"
    >
      <div className="size-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center group-hover:bg-[#007A53] transition-colors">
        <Icon className="size-5 text-[#007A53] group-hover:text-white transition-colors" />
      </div>
      <span className="text-xs font-medium text-foreground whitespace-nowrap">{label}</span>
    </button>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("accueil")
  const [showBalance, setShowBalance] = useState(true)
  const [balance, setBalance] = useState(VALID_USER.balance)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    setBalance(getBalance())
    setTransactions(getTransactions())
  }, [])

  const handleTransferSuccess = useCallback((newBal: number, tx: Omit<Transaction, "id">) => {
    updateBalance(newBal)
    addTransaction(tx)
    setBalance(newBal)
    setTransactions(getTransactions())
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const tabContent: Record<Tab, React.ReactNode> = {
    accueil: (
      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-br from-[#007A53] to-[#009E6D] rounded-2xl p-6 text-white shadow-xl shadow-[#007A53]/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/70 text-sm font-medium">Compte courant</p>
              <p className="text-white font-semibold">{VALID_USER.prenom} {VALID_USER.nom}</p>
            </div>
            <button
              onClick={() => setShowBalance((s) => !s)}
              aria-label={showBalance ? "Masquer le solde" : "Afficher le solde"}
              className="size-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              {showBalance ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <div className="mb-6">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Solde disponible</p>
            <p className="font-heading font-bold text-4xl tracking-tight">
              {showBalance ? formatAmount(balance) : "••••••••"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <Shield className="size-3.5" />
            <span>Compte protégé — FGDR 100 000€</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Actions rapides</p>
          <div className="grid grid-cols-4 gap-3">
            <QuickAction icon={Send} label="Virer" onClick={() => setActiveTab("virements")} />
            <QuickAction icon={Download} label="Recevoir" onClick={() => setActiveTab("virements")} />
            <QuickAction icon={CreditCard} label="Ma carte" onClick={() => setActiveTab("carte")} />
            <QuickAction icon={Plus} label="Historique" onClick={() => setActiveTab("historique")} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Dernières opérations</p>
            <button onClick={() => setActiveTab("historique")} className="text-xs text-[#007A53] font-semibold hover:underline flex items-center gap-1">
              Tout voir <ChevronRight className="size-3" />
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {transactions.slice(0, 5).map((tx, i) => (
              <div key={tx.id} className={cn("flex items-center gap-3 px-4 py-3.5", i < 4 ? "border-b border-border" : "")}>
                <div className="size-10 rounded-xl bg-[#F5F7F8] flex items-center justify-center flex-shrink-0">
                  <TxIcon icon={tx.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tx.label}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                </div>
                <p className={cn("text-sm font-semibold flex-shrink-0", tx.type === "credit" ? "text-[#007A53]" : "text-foreground")}>
                  {tx.type === "credit" ? "+" : ""}{formatAmount(Math.abs(tx.amount))}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-border rounded-2xl p-4">
            <TrendingUp className="size-5 text-[#007A53] mb-2" />
            <p className="text-xs text-muted-foreground">Revenus ce mois</p>
            <p className="font-heading font-bold text-lg text-[#007A53]">
              {formatAmount(transactions.filter(t => t.type === "credit").reduce((s, t) => s + t.amount, 0))}
            </p>
          </div>
          <div className="bg-white border border-border rounded-2xl p-4">
            <Send className="size-5 text-red-400 mb-2" />
            <p className="text-xs text-muted-foreground">Dépenses ce mois</p>
            <p className="font-heading font-bold text-lg text-foreground">
              {formatAmount(Math.abs(transactions.filter(t => t.type === "debit").reduce((s, t) => s + t.amount, 0)))}
            </p>
          </div>
        </div>
      </div>
    ),

    carte: (
      <div className="flex flex-col gap-6">
        <VisaCard />
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Lock, label: "Bloquer" },
            { icon: Globe, label: "Paiement en ligne" },
            { icon: Bell, label: "Alertes" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="flex flex-col items-center gap-2 py-4 rounded-2xl border border-border bg-white hover:border-[#007A53]/40 transition-all group">
              <Icon className="size-5 text-muted-foreground group-hover:text-[#007A53] transition-colors" />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </div>
    ),

    virements: (
      <div className="flex flex-col gap-4">
        <div className="bg-[#E8F5EF] rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="size-9 rounded-xl bg-[#007A53] flex items-center justify-center flex-shrink-0">
            <ArrowLeftRight className="size-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#007A53]">Virement sécurisé</p>
            <p className="text-xs text-[#007A53]/70">Transfert instantané — disponible 24h/24</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <TransferForm balance={balance} onSuccess={handleTransferSuccess} />
        </div>
      </div>
    ),

    historique: (
      <div className="flex flex-col gap-4">
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <p className="font-semibold text-foreground">Toutes les opérations</p>
            <span className="text-xs text-muted-foreground">{transactions.length} opération(s)</span>
          </div>
          {transactions.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">Aucune opération</div>
          ) : (
            transactions.map((tx, i) => (
              <div key={tx.id} className={cn("flex items-center gap-3 px-5 py-4", i < transactions.length - 1 ? "border-b border-border" : "")}>
                <div className="size-10 rounded-xl bg-[#F5F7F8] flex items-center justify-center flex-shrink-0">
                  <TxIcon icon={tx.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tx.label}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{formatDate(tx.date)}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[#F5F7F8] text-muted-foreground">{tx.category}</span>
                  </div>
                </div>
                <p className={cn("text-sm font-semibold flex-shrink-0", tx.type === "credit" ? "text-[#007A53]" : "text-foreground")}>
                  {tx.type === "credit" ? "+" : "-"}{formatAmount(Math.abs(tx.amount))}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    ),

    parametres: (
      <div className="flex flex-col gap-4">
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center gap-4 pb-4 border-b border-border mb-4">
            <div className="size-16 rounded-2xl bg-[#007A53] flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0">
              JC
            </div>
            <div>
              <p className="font-heading font-bold text-lg text-foreground">{VALID_USER.prenom} {VALID_USER.nom}</p>
              <p className="text-sm text-muted-foreground">{VALID_USER.email}</p>
            </div>
          </div>
          {[
            { label: "Nom", value: VALID_USER.nom },
            { label: "Prénom", value: VALID_USER.prenom },
            { label: "E-mail", value: VALID_USER.email },
            { label: "IBAN", value: VALID_USER.iban },
            { label: "BIC", value: VALID_USER.bic },
            { label: "N° de compte", value: VALID_USER.accountNumber },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm font-medium text-foreground text-right max-w-[55%] truncate">{row.value}</span>
            </div>
          ))}
        </div>

        {[
          { icon: Bell, label: "Notifications et alertes" },
          { icon: Lock, label: "Sécurité et mot de passe" },
          { icon: Smartphone, label: "Appareils connectés" },
          { icon: User, label: "Gérer mon profil" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="flex items-center gap-4 bg-white border border-border rounded-2xl px-5 py-4 hover:border-[#007A53]/40 transition-all group text-left">
            <div className="size-9 rounded-xl bg-[#F5F7F8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8F5EF] transition-colors">
              <Icon className="size-4 text-muted-foreground group-hover:text-[#007A53] transition-colors" />
            </div>
            <span className="text-sm font-medium text-foreground flex-1">{label}</span>
            <ChevronDown className="size-4 text-muted-foreground -rotate-90" />
          </button>
        ))}

        <button onClick={handleLogout} className="flex items-center justify-center gap-2.5 w-full py-3.5 mt-2 border border-red-200 rounded-2xl text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
          <LogOut className="size-4" />
          Se déconnecter
        </button>
      </div>
    ),
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] flex flex-col lg:flex-row">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-border min-h-screen sticky top-0">
        <div className="px-6 py-5 border-b border-border flex items-center gap-3">
          <div className="size-9 rounded-xl bg-[#007A53] flex items-center justify-center">
            <span className="text-white text-xs font-black">CA</span>
          </div>
          <div>
            <p className="font-heading font-bold text-foreground leading-none">Crédit Agricole</p>
            <p className="text-[11px] text-muted-foreground">Espace client</p>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#007A53] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              JC
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{VALID_USER.prenom}</p>
              <p className="text-xs text-muted-foreground truncate">{VALID_USER.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all w-full text-left",
                activeTab === id ? "bg-[#E8F5EF] text-[#007A53] font-semibold" : "text-foreground hover:bg-[#F5F7F8]"
              )}
            >
              <Icon className={cn("size-4.5", activeTab === id ? "text-[#007A53]" : "text-muted-foreground")} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-3 mx-3 mb-3 bg-[#007A53] rounded-xl">
          <p className="text-white/70 text-[11px] uppercase tracking-wider">Solde</p>
          <p className="text-white font-heading font-bold text-lg">
            {showBalance ? formatAmount(balance) : "••••••"}
          </p>
        </div>

        <button onClick={handleLogout} className="mx-3 mb-5 flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <LogOut className="size-4" />
          Déconnexion
        </button>
      </aside>

      <div className="lg:hidden bg-white border-b border-border px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-[#007A53] flex items-center justify-center">
            <span className="text-white text-[10px] font-black">CA</span>
          </div>
          <span className="font-heading font-bold text-foreground text-base">Crédit Agricole</span>
        </div>
        <button aria-label="Notifications" className="size-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
          <Bell className="size-4 text-muted-foreground" />
        </button>
      </div>

      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 pb-28 lg:pb-10 lg:py-8">
          <div className="mb-6">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Bonjour, {VALID_USER.prenom.split(" ")[0]}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              aria-label={label}
              className={cn("flex flex-col items-center gap-1 flex-1 py-2 transition-all", activeTab === id ? "text-[#007A53]" : "text-muted-foreground")}
            >
              <div className={cn("size-8 rounded-xl flex items-center justify-center transition-colors", activeTab === id ? "bg-[#E8F5EF]" : "")}>
                <Icon className={cn("size-4.5", activeTab === id ? "text-[#007A53]" : "")} />
              </div>
              <span className={cn("text-[10px] font-medium", activeTab === id ? "text-[#007A53]" : "")}>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <AIAssistant balance={balance} userName={VALID_USER.prenom.split(" ")[0]} />
    </div>
  )
}