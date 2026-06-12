"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Send, Bot, Loader2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  ts: number
}

const SUGGESTIONS = [
  "Quel est mon solde ?",
  "Comment faire un virement ?",
  "Comment bloquer ma carte ?",
  "Quels sont mes derniers mouvements ?",
]

function getReply(input: string, balance: number, userName: string): string {
  const q = input.toLowerCase().trim()

  if (/solde|combien|argent|avoir/.test(q))
    return `Votre solde actuel est de **${new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(balance)}**. Votre compte est en bonne santé !`

  if (/virement|virer|envoyer|transférer|transfer/.test(q))
    return `Pour effectuer un virement, rendez-vous dans l'onglet **Virements** du menu. Il vous suffira de renseigner le nom, prénom et adresse Gmail du bénéficiaire, ainsi que le montant. Le transfert est instantané.`

  if (/bloquer|bloq|perdu|volé|suspendre/.test(q))
    return `Vous pouvez bloquer votre carte immédiatement depuis l'onglet **Ma Carte** en cliquant sur "Bloquer". En cas d'urgence, appelez le **0 800 123 456** (numéro gratuit, disponible 24h/24).`

  if (/déplafonner|plafond|limite/.test(q))
    return `Pour modifier le plafond de votre carte, accédez à l'onglet **Ma Carte** puis "Paiement en ligne". Vous pouvez aussi contacter votre conseiller au **39 00** (lundi-vendredi 8h-20h).`

  if (/frais|tarif|commission|coût/.test(q))
    return `Vos virements SEPA standards sont **gratuits**. Les virements instantanés sont à 0,95€. Pour la grille tarifaire complète, consultez l'espace Documents de votre compte.`

  if (/iban|rib|bic|coordonnées bancaire/.test(q))
    return `Vos coordonnées bancaires :\n• **IBAN :** FR76 1770 6000 3200 1234 5678 997\n• **BIC :** AGRIFRPP\nVous les trouverez aussi dans l'onglet **Paramètres**.`

  if (/conseiller|rendez-vous|rdv|agence|contact/.test(q))
    return `Pour contacter votre conseiller :\n• **Téléphone :** 39 00 (lun-ven 8h-20h, sam 9h-17h)\n• **Messagerie sécurisée :** depuis l'onglet Paramètres\n• **En agence :** 2 200 agences partout en France`

  if (/carte|visa|numéro de carte|expir/.test(q))
    return `Retrouvez toutes les informations de votre carte Visa dans l'onglet **Ma Carte**. Cliquez sur la carte pour la retourner et afficher le CVV (recto/verso).`

  if (/histoire|historique|opération|mouvement|transaction/.test(q))
    return `Consultez toutes vos opérations depuis l'onglet **Historique**. Chaque transaction est classée par date et catégorie.`

  if (/épargne|livret|intérêt|placer/.test(q))
    return `Crédit Agricole propose plusieurs solutions d'épargne : Livret A (3%), LDDS, PEL, Assurance-vie... Prenez rendez-vous avec votre conseiller pour un bilan patrimonial gratuit.`

  if (/crédit|prêt|emprunt|immobilier|voiture/.test(q))
    return `Vous souhaitez un crédit ? Utilisez notre simulateur sur le site principal ou appelez le **39 00**. Une réponse de principe est donnée sous 48h pour les prêts immobiliers.`

  if (/sécurité|sécurisé|fraude|escroquerie|phishing/.test(q))
    return `La sécurité est notre priorité. En cas de suspicion de fraude :\n• Bloquez votre carte depuis l'onglet Ma Carte\n• Appelez le **0 800 123 456** (24h/24)\n• Ne communiquez jamais votre code PIN ni mot de passe`

  if (/assurance|protection|garantie/.test(q))
    return `Crédit Agricole propose des assurances habitation, auto, santé et prévoyance. Contactez votre conseiller au **39 00** pour un devis personnalisé.`

  if (/mot de passe|password|changer.*passe|réinitialiser/.test(q))
    return `Pour modifier votre mot de passe, allez dans **Paramètres → Sécurité et mot de passe**. En cas d'oubli, cliquez sur "Mot de passe oublié" sur la page de connexion.`

  if (/bonjour|salut|hello|bonsoir|coucou/.test(q))
    return `Bonjour ${userName} ! Je suis votre assistant bancaire Crédit Agricole. Comment puis-je vous aider aujourd'hui ?`

  if (/merci|super|parfait|nickel|bien/.test(q))
    return `Avec plaisir, ${userName} ! N'hésitez pas si vous avez d'autres questions. Je suis là 24h/24.`

  if (/aide|help|que.*faire|comment/.test(q))
    return `Je peux vous aider avec :\n• Consulter votre **solde**\n• Effectuer un **virement**\n• Gérer votre **carte**\n• Contacter un **conseiller**\n• Informations sur les **produits** Crédit Agricole\n\nQue souhaitez-vous faire ?`

  return `Je n'ai pas bien compris votre demande. Pouvez-vous reformuler ? Vous pouvez me demander des informations sur votre solde, vos virements, votre carte ou contacter un conseiller.`
}

function formatReply(text: string) {
  return text
    .split("\n")
    .map((line, i) =>
      line.startsWith("•") ? (
        <li key={i} className="ml-3 list-disc list-inside text-sm leading-relaxed">
          {line.replace(/\*\*(.+?)\*\*/g, (_, m) => m).split("**").map((p, j) =>
            j % 2 === 1 ? <strong key={j}>{p}</strong> : p
          )}
        </li>
      ) : (
        <p key={i} className={cn("text-sm leading-relaxed", line === "" ? "h-2" : "")}>
          {line.split(/\*\*(.+?)\*\*/).map((p, j) =>
            j % 2 === 1 ? <strong key={j}>{p}</strong> : p
          )}
        </p>
      )
    )
}

export function AIAssistant({ balance, userName }: { balance: number; userName: string }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Bonjour ${userName} ! Je suis votre assistant bancaire Crédit Agricole. Comment puis-je vous aider ?`,
      ts: Date.now(),
    },
  ])
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, thinking])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking) return
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", content: text.trim(), ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setThinking(true)
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600))
    const reply = getReply(text, balance, userName)
    setMessages((m) => [...m, { id: `a${Date.now()}`, role: "assistant", content: reply, ts: Date.now() }])
    setThinking(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant IA"}
        className={cn(
          "fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 size-14 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300",
          open
            ? "bg-[#1F2937] text-white"
            : "bg-[#007A53] text-white hover:bg-[#009E6D] hover:scale-105"
        )}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="size-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="size-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-36 right-4 lg:bottom-24 lg:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[calc(100vh-12rem)] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
            style={{ maxHeight: 520 }}
          >
            {/* Header */}
            <div className="bg-[#007A53] px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
              <div className="size-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="size-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Assistant Crédit Agricole</p>
                <p className="text-white/70 text-xs">En ligne — Répond instantanément</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Réduire l'assistant"
                className="size-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <ChevronDown className="size-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  {msg.role === "assistant" && (
                    <div className="size-7 rounded-full bg-[#E8F5EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="size-3.5 text-[#007A53]" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 flex flex-col gap-1",
                      msg.role === "user"
                        ? "bg-[#007A53] text-white rounded-tr-sm"
                        : "bg-[#F5F7F8] text-foreground rounded-tl-sm"
                    )}
                  >
                    {msg.role === "user" ? (
                      <p className="text-sm leading-relaxed text-white">{msg.content}</p>
                    ) : (
                      <div className="flex flex-col gap-0.5">{formatReply(msg.content)}</div>
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex gap-2.5">
                  <div className="size-7 rounded-full bg-[#E8F5EF] flex items-center justify-center flex-shrink-0">
                    <Bot className="size-3.5 text-[#007A53]" />
                  </div>
                  <div className="bg-[#F5F7F8] rounded-2xl rounded-tl-sm px-3.5 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="size-1.5 rounded-full bg-[#007A53]/40"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#007A53]/30 text-[#007A53] hover:bg-[#E8F5EF] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-3 pb-3 pt-2 border-t border-border flex items-center gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question…"
                disabled={thinking}
                className="flex-1 px-3.5 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007A53]/40 focus:border-[#007A53] transition-colors bg-background disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                aria-label="Envoyer"
                className="size-10 rounded-xl bg-[#007A53] flex items-center justify-center disabled:opacity-40 hover:bg-[#009E6D] transition-colors flex-shrink-0"
              >
                {thinking ? (
                  <Loader2 className="size-4 text-white animate-spin" />
                ) : (
                  <Send className="size-4 text-white" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
