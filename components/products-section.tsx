"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  CreditCard,
  PiggyBank,
  Home,
  Banknote,
  Shield,
  Wallet,
  ArrowRight,
} from "lucide-react"

const products = [
  {
    icon: Wallet,
    title: "Compte bancaire",
    description:
      "Gérez votre argent simplement avec un compte courant adapté à vos besoins, avec ou sans frais.",
    cta: "Découvrir",
    color: "#007A53",
    bg: "#E8F5EF",
  },
  {
    icon: CreditCard,
    title: "Carte bancaire",
    description:
      "Visa ou Mastercard, classique ou premium. Profitez d'avantages exclusifs et d'une sécurité renforcée.",
    cta: "Voir les cartes",
    color: "#007A53",
    bg: "#E8F5EF",
  },
  {
    icon: PiggyBank,
    title: "Épargne",
    description:
      "Livret A, LDDS, PEL ou assurance-vie. Faites fructifier votre épargne selon vos objectifs.",
    cta: "Épargner maintenant",
    color: "#007A53",
    bg: "#E8F5EF",
  },
  {
    icon: Home,
    title: "Prêt immobilier",
    description:
      "Financez votre projet immobilier avec les meilleurs taux du marché et un accompagnement sur-mesure.",
    cta: "Simuler mon prêt",
    color: "#007A53",
    bg: "#E8F5EF",
  },
  {
    icon: Banknote,
    title: "Crédit personnel",
    description:
      "Financez vos projets personnels rapidement avec notre crédit à la consommation flexible.",
    cta: "Faire une demande",
    color: "#007A53",
    bg: "#E8F5EF",
  },
  {
    icon: Shield,
    title: "Assurance",
    description:
      "Protégez ce qui vous est cher : auto, habitation, santé, prévoyance. Des offres complètes et adaptées.",
    cta: "Me protéger",
    color: "#007A53",
    bg: "#E8F5EF",
  },
]

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0]
  index: number
}) {
  const Icon = product.icon
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,122,83,0.15)" }}
      className="bg-white rounded-2xl border border-border p-6 flex flex-col gap-4 cursor-pointer group transition-shadow duration-300"
    >
      <div
        className="size-12 rounded-xl flex items-center justify-center transition-colors duration-200"
        style={{ backgroundColor: product.bg }}
      >
        <Icon className="size-6" style={{ color: product.color }} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          {product.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {product.description}
        </p>
      </div>
      <button className="flex items-center gap-1.5 text-[#007A53] text-sm font-semibold mt-auto group-hover:gap-3 transition-all duration-200">
        {product.cta}
        <ArrowRight className="size-4" />
      </button>
    </motion.article>
  )
}

export function ProductsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="produits"
      className="py-20 bg-[#F5F7F8]"
      aria-labelledby="products-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold mb-4">
            Nos produits
          </span>
          <h2
            id="products-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4 text-balance"
          >
            Tous vos services bancaires en un seul endroit
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Que vous soyez particulier ou professionnel, nous avons les solutions
            adaptées à chaque moment de votre vie.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
