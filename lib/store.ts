import { VALID_USER } from "./auth"

export type Transaction = {
  id: string
  date: string
  label: string
  amount: number
  type: "credit" | "debit"
  category: string
  icon: string
}

const STORAGE_KEY = "ca_transactions"
const BALANCE_KEY = "ca_balance"

const defaultTransactions: Transaction[] = [
  { id: "t1", date: "2025-06-10", label: "Virement reçu — Employeur SA", amount: 3200, type: "credit", category: "Revenus", icon: "briefcase" },
  { id: "t2", date: "2025-06-09", label: "Paiement Carrefour Market", amount: -87.4, type: "debit", category: "Alimentation", icon: "shopping-cart" },
  { id: "t3", date: "2025-06-08", label: "Abonnement Netflix", amount: -15.99, type: "debit", category: "Loisirs", icon: "tv" },
  { id: "t4", date: "2025-06-07", label: "Loyer Juin 2025", amount: -950, type: "debit", category: "Logement", icon: "home" },
  { id: "t5", date: "2025-06-06", label: "Remboursement Marie D.", amount: 50, type: "credit", category: "Virement reçu", icon: "arrow-down" },
  { id: "t6", date: "2025-06-05", label: "EDF — Facture électricité", amount: -68.2, type: "debit", category: "Énergie", icon: "zap" },
  { id: "t7", date: "2025-06-04", label: "Pharmacie du Centre", amount: -23.5, type: "debit", category: "Santé", icon: "heart" },
  { id: "t8", date: "2025-06-03", label: "Virement vers Thomas B.", amount: -200, type: "debit", category: "Virement émis", icon: "send" },
  { id: "t9", date: "2025-06-02", label: "Spotify Premium", amount: -10.99, type: "debit", category: "Loisirs", icon: "music" },
  { id: "t10", date: "2025-06-01", label: "Restaurant La Bonne Fourchette", amount: -45, type: "debit", category: "Restauration", icon: "utensils" },
]

export function getTransactions(): Transaction[] {
  if (typeof window === "undefined") return defaultTransactions
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTransactions))
    return defaultTransactions
  }
  return JSON.parse(stored)
}

export function addTransaction(tx: Omit<Transaction, "id">): void {
  const transactions = getTransactions()
  const newTx = { ...tx, id: `t${Date.now()}` }
  transactions.unshift(newTx)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

export function getBalance(): number {
  if (typeof window === "undefined") return VALID_USER.balance
  const stored = localStorage.getItem(BALANCE_KEY)
  return stored ? parseFloat(stored) : VALID_USER.balance
}

export function updateBalance(newBalance: number): void {
  localStorage.setItem(BALANCE_KEY, String(newBalance))
}
