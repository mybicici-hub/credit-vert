"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const articles = [
  {
    image: "/images/news-1.png",
    category: "Finance durable",
    title: "Crédit Agricole finance 500M€ de projets d'énergie renouvelable en 2025",
    date: "5 juin 2025",
    excerpt:
      "Notre banque renforce son engagement environnemental avec un plan d'investissement massif dans la transition énergétique française.",
  },
  {
    image: "/images/news-2.png",
    category: "Innovation",
    title: "L'application Crédit Agricole élue meilleure banque digitale de France",
    date: "28 mai 2025",
      excerpt:
      "Pour la troisième année consécutive, Crédit Agricole remporte le prix de la meilleure expérience bancaire mobile.",
  },
  {
    image: "/images/news-3.png",
    category: "Vie pratique",
    title: "Prêt à taux zéro : ce qui change pour les familles en 2025",
    date: "12 mai 2025",
    excerpt:
      "Le gouvernement a élargi les conditions d'accès au PTZ. Découvrez si vous êtes éligible et comment en bénéficier.",
  },
]

export function NewsSection() {
  return (
    <section
      id="actualites"
      className="py-20 bg-[#F5F7F8]"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold mb-4">
              Actualités
            </span>
            <h2
              id="news-heading"
              className="font-heading font-bold text-3xl sm:text-4xl text-foreground text-balance"
            >
              Les dernières nouvelles de Crédit Agricole
            </h2>
          </div>
          <Button
            variant="outline"
            className="border-[#007A53] text-[#007A53] hover:bg-[#E8F5EF] font-semibold flex-shrink-0"
          >
            Toutes les actualités <ArrowRight className="size-4 ml-1" />
          </Button>
        </motion.div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-[#007A53]/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-[#007A53] border-0 shadow-sm font-semibold">
                    {article.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Calendar className="size-3.5" />
                  <time dateTime={article.date}>{article.date}</time>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground leading-snug text-pretty group-hover:text-[#007A53] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
                <button className="flex items-center gap-1.5 text-[#007A53] text-sm font-semibold mt-2 group-hover:gap-3 transition-all duration-200">
                  Lire l&apos;article <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
