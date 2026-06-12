"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Gérante de PME, Lyon",
    initials: "MD",
    rating: 5,
    text: "CréditVert m'a accompagnée lors du lancement de mon entreprise avec un crédit professionnel adapté. Le conseiller était disponible, réactif et vraiment à l'écoute. Je recommande vivement.",
    color: "#007A53",
  },
  {
    name: "Thomas Bernard",
    role: "Jeune propriétaire, Bordeaux",
    initials: "TB",
    rating: 5,
    text: "J'ai obtenu mon prêt immobilier en un temps record. L'application mobile est top, je peux tout gérer depuis mon téléphone. La transparence sur les frais est vraiment appréciable.",
    color: "#009E6D",
  },
  {
    name: "Sophie Martin",
    role: "Retraitée, Nantes",
    initials: "SM",
    rating: 5,
    text: "Après 35 ans chez Crédit Agricole, je ne peux qu'être satisfaite. Les conseillers prennent le temps d'expliquer, les frais sont clairs et l'accueil en agence est toujours chaleureux.",
    color: "#007A53",
  },
  {
    name: "Lucas Petit",
    role: "Étudiant, Paris",
    initials: "LP",
    rating: 5,
    text: "Le compte étudiant sans frais est parfait pour mon budget serré. L'appli est intuitive et les notifications m'aident à mieux gérer mon argent. Exactement ce qu'il me fallait.",
    color: "#009E6D",
  },
  {
    name: "Claire Rousseau",
    role: "Agricultrice, Bretagne",
    initials: "CR",
    rating: 5,
    text: "CréditVert comprend les réalités de l'agriculture. Mon conseiller connaît bien le secteur et m'a proposé des solutions financières réellement adaptées à mon exploitation.",
    color: "#007A53",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setDirection(1)
    setCurrent((p) => (p + 1) % testimonials.length)
  }

  const testimonial = testimonials[current]

  return (
    <section
      id="temoignages"
      className="py-20 bg-white overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold mb-4">
            Témoignages
          </span>
          <h2
            id="testimonials-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4 text-balance"
          >
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Plus de 4,8 millions de clients nous accordent leur confiance chaque jour.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#F5F7F8] rounded-3xl p-8 sm:p-12 flex flex-col gap-6"
            >
              {/* Quote icon */}
              <Quote className="size-10 text-[#007A53] opacity-30" />

              {/* Stars */}
              <Stars count={testimonial.rating} />

              {/* Text */}
              <blockquote className="text-foreground text-lg sm:text-xl leading-relaxed font-medium">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-2">
                <div
                  className="size-12 rounded-full flex items-center justify-center text-white font-bold font-heading text-sm flex-shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              aria-label="Témoignage précédent"
              className="size-11 rounded-full border border-border bg-white flex items-center justify-center hover:border-[#007A53] hover:text-[#007A53] transition-colors shadow-sm"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Témoignage ${i + 1}`}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-[#007A53]" : "w-2 bg-[#007A53]/25"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Témoignage suivant"
              className="size-11 rounded-full border border-border bg-white flex items-center justify-center hover:border-[#007A53] hover:text-[#007A53] transition-colors shadow-sm"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
