"use client"

import { motion } from "framer-motion"
import { Leaf, MapPin, Users, Wheat, Trophy, Building2 } from "lucide-react"

const commitments = [
  {
    icon: Leaf,
    title: "Développement durable",
    description:
      "Nous finançons la transition écologique et réduisons notre empreinte carbone de 50% d'ici 2030.",
    metric: "100%",
    metricLabel: "papier recyclé",
  },
  {
    icon: MapPin,
    title: "Développement local",
    description:
      "Implantés dans chaque territoire depuis 125 ans, nous soutenons l'économie locale et les projets de nos régions.",
    metric: "2 200+",
    metricLabel: "agences en France",
  },
  {
    icon: Users,
    title: "Inclusion financière",
    description:
      "Nous offrons des solutions adaptées à tous, des personnes en situation de fragilité aux seniors.",
    metric: "150 000",
    metricLabel: "bénéficiaires/an",
  },
  {
    icon: Wheat,
    title: "Soutien à l'agriculture",
    description:
      "Premier partenaire financier des agriculteurs français, nous accompagnons la modernisation du secteur.",
    metric: "1er",
    metricLabel: "partenaire agricole",
  },
  {
    icon: Trophy,
    title: "Sponsoring sportif",
    description:
      "Partenaire officiel du sport français, nous soutenons les clubs locaux et les événements sportifs nationaux.",
    metric: "500+",
    metricLabel: "clubs soutenus",
  },
  {
    icon: Building2,
    title: "Projets communautaires",
    description:
      "Via notre fondation, nous finançons des projets solidaires et culturels partout en France.",
    metric: "25M€",
    metricLabel: "investis en 2024",
  },
]

export function CommitmentsSection() {
  return (
    <section
      id="engagements"
      className="py-20 bg-white"
      aria-labelledby="commitments-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold mb-4">
            Nos engagements
          </span>
          <h2
            id="commitments-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4 text-balance"
          >
            Une banque engagée pour un monde meilleur
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Crédit Agricole place la responsabilité sociale et environnementale au
            cœur de sa stratégie depuis plus d&apos;un siècle.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitments.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-[#F5F7F8] rounded-2xl p-6 overflow-hidden hover:bg-[#E8F5EF]/60 transition-colors duration-300"
              >
                {/* Top row: icon + metric */}
                <div className="flex items-start justify-between mb-4">
                  <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#007A53] transition-colors duration-300">
                    <Icon className="size-6 text-[#007A53] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-2xl text-[#007A53]">
                      {item.metric}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.metricLabel}</p>
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative corner */}
                <div
                  className="absolute -bottom-4 -right-4 size-20 rounded-full bg-[#007A53]/5 group-hover:bg-[#007A53]/10 transition-colors"
                  aria-hidden="true"
                />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
