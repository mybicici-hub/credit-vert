"use client"

import { motion } from "framer-motion"
import { ArrowRight, GraduationCap, Briefcase, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const offers = [
  {
    icon: Sparkles,
    badge: "Offre spéciale",
    title: "Compte Premium",
    description:
      "Bénéficiez de 3 mois offerts sur votre abonnement Premium avec carte Visa Infinite, assurances voyages et conciergerie bancaire.",
    highlight: "3 mois offerts",
    cta: "Profiter de l'offre",
    color: "#007A53",
    bgFrom: "#E8F5EF",
    bgTo: "#d1ede2",
  },
  {
    icon: GraduationCap,
    badge: "Étudiants",
    title: "Banque étudiante",
    description:
      "Compte sans frais, carte Visa gratuite et découvert autorisé jusqu'à 500€. L'indépendance financière pour votre vie étudiante.",
    highlight: "0€ de frais",
    cta: "Ouvrir un compte étudiant",
    color: "#007A53",
    bgFrom: "#E8F5EF",
    bgTo: "#d1ede2",
  },
  {
    icon: Briefcase,
    badge: "Jeunes actifs",
    title: "Pack Jeune Pro",
    description:
      "Tout ce qu'il vous faut pour démarrer votre vie professionnelle : compte courant, épargne, assurances et conseils personnalisés.",
    highlight: "Tout inclus",
    cta: "Démarrer maintenant",
    color: "#007A53",
    bgFrom: "#E8F5EF",
    bgTo: "#d1ede2",
  },
  {
    icon: Heart,
    badge: "Famille",
    title: "Banque famille",
    description:
      "Gérez les finances de toute la famille avec des comptes joints, des cartes pour les enfants et une épargne pour leur avenir.",
    highlight: "Solutions complètes",
    cta: "Découvrir l'offre famille",
    color: "#007A53",
    bgFrom: "#E8F5EF",
    bgTo: "#d1ede2",
  },
]

export function OffersSection() {
  return (
    <section
      id="offres"
      className="py-20 bg-white"
      aria-labelledby="offers-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold mb-4">
            Offres spéciales
          </span>
          <h2
            id="offers-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4 text-balance"
          >
            Des offres pensées pour chaque étape de votre vie
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Étudiants, jeunes actifs, familles... Nous avons l&apos;offre qui vous correspond.
          </p>
        </motion.div>

        {/* Offers grid - 2 cols desktop, 1 col mobile */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon
            return (
              <motion.article
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-[#007A53]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Colored top strip */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${offer.color}, ${offer.color}99)` }}
                />
                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className="size-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: offer.bgFrom }}
                    >
                      <Icon className="size-5" style={{ color: offer.color }} />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[#E8F5EF] text-[#007A53] border-0"
                    >
                      {offer.badge}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* Highlight pill */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold w-fit"
                    style={{ backgroundColor: offer.bgFrom, color: offer.color }}
                  >
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: offer.color }} />
                    {offer.highlight}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-[#007A53] text-[#007A53] hover:bg-[#007A53] hover:text-white transition-colors font-semibold group-hover:bg-[#007A53] group-hover:text-white"
                  >
                    {offer.cta}
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
