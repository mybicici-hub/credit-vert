"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const slides = [
  {
    id: 1,
    badge: "Nouveauté 2025",
    headline: "Votre avenir financier commence aujourd'hui",
    description:
      "Ouvrez votre compte en ligne en 5 minutes et bénéficiez d'avantages exclusifs dès la première semaine. Zéro frais de tenue de compte.",
    cta: "Ouvrir un compte",
    ctaSecondary: "En savoir plus",
    image: "/images/hero-banking.png",
    accentColor: "#007A53",
  },
  {
    id: 2,
    badge: "Offre exclusive",
    headline: "Jusqu'à 3% d'intérêts sur votre épargne",
    description:
      "Faites fructifier votre épargne avec nos livrets à taux boosté. Disponible et sans risque pour tous nos clients.",
    cta: "Découvrir l'offre",
    ctaSecondary: "Simuler mon épargne",
    image: "/images/hero-banking.png",
    accentColor: "#009E6D",
  },
  {
    id: 3,
    badge: "Crédit immobilier",
    headline: "Réalisez votre projet immobilier sereinement",
    description:
      "Des taux compétitifs et un accompagnement personnalisé pour concrétiser votre rêve immobilier. Réponse de principe en 48h.",
    cta: "Simuler mon prêt",
    ctaSecondary: "Prendre rendez-vous",
    image: "/images/hero-banking.png",
    accentColor: "#007A53",
  },
]

const stats = [
  { value: "4.8M", label: "Clients" },
  { value: "2 200+", label: "Agences" },
  { value: "98%", label: "Satisfaction" },
  { value: "125 ans", label: "D'expertise" },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const prev = () => {
    setIsAutoPlaying(false)
    setCurrent((p) => (p - 1 + slides.length) % slides.length)
  }
  const next = () => {
    setIsAutoPlaying(false)
    setCurrent((p) => (p + 1) % slides.length)
  }

  const slide = slides[current]

  return (
    <section
      className="relative min-h-[85vh] bg-[#F5F7F8] overflow-hidden flex flex-col"
      aria-label="Bannière principale"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E8F5EF]/40" />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#007A53]/5 -translate-x-1/2 translate-y-1/2"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-12 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold">
                <span className="size-1.5 rounded-full bg-[#007A53] animate-pulse" />
                {slide.badge}
              </span>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
                {slide.headline}
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                {slide.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-[#007A53] hover:bg-[#009E6D] text-white font-semibold rounded-full px-8 gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-[#007A53]/20"
                >
                  {slide.cta}
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#007A53] text-[#007A53] hover:bg-[#E8F5EF] font-semibold rounded-full px-8"
                >
                  {slide.ctaSecondary}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${slide.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src={slide.image}
                  alt="Services bancaires Crédit Agricole"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3"
              >
                <div className="size-10 rounded-full bg-[#E8F5EF] flex items-center justify-center">
                  <span className="text-[#007A53] text-lg font-bold">✓</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ouverture en ligne</p>
                  <p className="text-sm font-semibold text-foreground">En seulement 5 minutes</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-2" role="tablist" aria-label="Diapositives">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setIsAutoPlaying(false); setCurrent(i) }}
              role="tab"
              aria-selected={i === current}
              aria-label={`Diapositive ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#007A53]" : "w-2 bg-[#007A53]/30"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Diapositive précédente"
            className="size-9 rounded-full border border-border bg-white flex items-center justify-center hover:border-[#007A53] hover:text-[#007A53] transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={next}
            aria-label="Diapositive suivante"
            className="size-9 rounded-full border border-border bg-white flex items-center justify-center hover:border-[#007A53] hover:text-[#007A53] transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-5 px-4 text-center">
                <span className="font-heading font-bold text-2xl sm:text-3xl text-[#007A53]">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
