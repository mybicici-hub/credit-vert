export const VALID_USER = {
  email: "Jadeclavequine@gmail.com",
  password: "Abdoul2026",
  nom: "Clavequine",
  prenom: "Jade Catherine",
  balance: 2000000,
  iban: "FR76 1770 6000 3200 1234 5678 997",
  bic: "AGRIFRPP",
  accountNumber: "32001234567",
  cardNumber: "4532 1234 5678 9012",
  cardExpiry: "09/29",
  cardCVV: "742",
}

export const SESSION_KEY = "ca_session"

export function login(email: string, password: string): boolean {
  if (
    email.toLowerCase() === VALID_USER.email.toLowerCase() &&
    password === VALID_USER.password
  ) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "authenticated")
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY)
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(SESSION_KEY) === "authenticated"
}
