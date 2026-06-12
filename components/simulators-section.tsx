"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

function formatAmount(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)
}

function LoanSimulator() {
  const [amount, setAmount] = useState(10000)
  const [months, setMonths] = useState(36)
  const rate = 4.9
  const monthlyRate = rate / 100 / 12
  const monthly =
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Montant du crédit</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{formatAmount(amount)}</span>
        </div>
        <Slider
          min={1000}
          max={75000}
          step={500}
          value={[amount]}
          onValueChange={(v) => setAmount(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 000€</span><span>75 000€</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Durée</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{months} mois</span>
        </div>
        <Slider
          min={12}
          max={84}
          step={6}
          value={[months]}
          onValueChange={(v) => setMonths(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>12 mois</span><span>84 mois</span>
        </div>
      </div>
      <div className="bg-[#E8F5EF] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Mensualité estimée</p>
          <p className="font-heading font-bold text-2xl text-[#007A53]">{formatAmount(monthly)}/mois</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>Taux indicatif</p>
          <p className="font-semibold text-foreground">{rate}% TAEG</p>
        </div>
      </div>
      <Button className="w-full bg-[#007A53] hover:bg-[#009E6D] text-white font-semibold rounded-xl gap-2">
        Faire une demande <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

function SavingsSimulator() {
  const [initial, setInitial] = useState(5000)
  const [monthly, setMonthly] = useState(200)
  const [years, setYears] = useState(10)
  const rate = 3.0
  const total =
    initial * Math.pow(1 + rate / 100, years) +
    monthly * 12 * ((Math.pow(1 + rate / 100, years) - 1) / (rate / 100))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Capital initial</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{formatAmount(initial)}</span>
        </div>
        <Slider
          min={0}
          max={50000}
          step={500}
          value={[initial]}
          onValueChange={(v) => setInitial(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0€</span><span>50 000€</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Versement mensuel</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{formatAmount(monthly)}/mois</span>
        </div>
        <Slider
          min={0}
          max={2000}
          step={50}
          value={[monthly]}
          onValueChange={(v) => setMonthly(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0€</span><span>2 000€/mois</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Durée</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{years} ans</span>
        </div>
        <Slider
          min={1}
          max={30}
          step={1}
          value={[years]}
          onValueChange={(v) => setYears(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 an</span><span>30 ans</span>
        </div>
      </div>
      <div className="bg-[#E8F5EF] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Capital estimé dans {years} ans</p>
          <p className="font-heading font-bold text-2xl text-[#007A53]">{formatAmount(total)}</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>Taux indicatif</p>
          <p className="font-semibold text-foreground">{rate}% annuel</p>
        </div>
      </div>
      <Button className="w-full bg-[#007A53] hover:bg-[#009E6D] text-white font-semibold rounded-xl gap-2">
        Ouvrir un livret <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

function MortgageSimulator() {
  const [price, setPrice] = useState(250000)
  const [down, setDown] = useState(50000)
  const [years, setYears] = useState(20)
  const loan = price - down
  const rate = 3.7
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const monthly =
    loan > 0
      ? (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      : 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Prix du bien</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{formatAmount(price)}</span>
        </div>
        <Slider
          min={50000}
          max={1000000}
          step={5000}
          value={[price]}
          onValueChange={(v) => setPrice(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>50 000€</span><span>1 000 000€</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Apport personnel</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{formatAmount(down)}</span>
        </div>
        <Slider
          min={0}
          max={Math.min(price, 500000)}
          step={5000}
          value={[down]}
          onValueChange={(v) => setDown(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0€</span><span>{formatAmount(Math.min(price, 500000))}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">Durée du prêt</label>
          <span className="font-heading font-bold text-[#007A53] text-lg">{years} ans</span>
        </div>
        <Slider
          min={5}
          max={30}
          step={1}
          value={[years]}
          onValueChange={(v) => setYears(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-thumb]]:border-[#007A53] [&_[data-slot=slider-range]]:bg-[#007A53]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>5 ans</span><span>30 ans</span>
        </div>
      </div>
      <div className="bg-[#E8F5EF] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Mensualité estimée</p>
          <p className="font-heading font-bold text-2xl text-[#007A53]">{formatAmount(monthly)}/mois</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>Montant emprunté</p>
          <p className="font-semibold text-foreground">{formatAmount(loan)}</p>
        </div>
      </div>
      <Button className="w-full bg-[#007A53] hover:bg-[#009E6D] text-white font-semibold rounded-xl gap-2">
        Prendre rendez-vous <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

const tabs = [
  { id: "loan", label: "Crédit personnel", icon: Calculator, component: LoanSimulator },
  { id: "savings", label: "Épargne", icon: TrendingUp, component: SavingsSimulator },
  { id: "mortgage", label: "Prêt immobilier", icon: Home, component: MortgageSimulator },
]

export function SimulatorsSection() {
  const [active, setActive] = useState("loan")
  const ActiveComponent = tabs.find((t) => t.id === active)?.component ?? LoanSimulator

  return (
    <section
      id="simulateurs"
      className="py-20 bg-[#F5F7F8]"
      aria-labelledby="simulators-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 lg:sticky lg:top-32"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold w-fit">
              Simulateurs
            </span>
            <h2
              id="simulators-heading"
              className="font-heading font-bold text-3xl sm:text-4xl text-foreground text-balance"
            >
              Estimez votre projet en quelques secondes
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Utilisez nos calculateurs interactifs pour obtenir une estimation
              immédiate de votre prêt, de votre épargne ou de votre investissement
              immobilier.
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-3">
              {[
                "Résultats instantanés et précis",
                "Aucun engagement de votre part",
                "Conseil personnalisé disponible en agence",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="size-5 rounded-full bg-[#E8F5EF] flex items-center justify-center flex-shrink-0">
                    <svg className="size-3 text-[#007A53]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: calculator widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              {/* Tab buttons */}
              <div className="flex border-b border-border" role="tablist">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={active === tab.id}
                      onClick={() => setActive(tab.id)}
                      className={cn(
                        "flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3.5 px-2 text-xs sm:text-sm font-medium transition-colors border-b-2",
                        active === tab.id
                          ? "border-[#007A53] text-[#007A53] bg-[#E8F5EF]/30"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="text-center leading-tight">{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Active simulator */}
              <div className="p-6">
                <ActiveComponent />
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-3">
              * Simulation à titre indicatif. Les offres finales dépendent de votre situation personnelle.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
