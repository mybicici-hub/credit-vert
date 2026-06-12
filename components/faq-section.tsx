"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const faqs = [
  {
    question: "Comment ouvrir un compte chez CréditVert ?",
    answer:
      "L'ouverture de compte se fait en ligne en moins de 5 minutes. Il vous suffit de fournir une pièce d'identité valide, un justificatif de domicile et un selfie. Vous pouvez également vous rendre dans l'une de nos 2 200 agences en France.",
  },
  {
    question: "Quels sont les frais de tenue de compte ?",
    answer:
      "Notre compte courant standard est sans frais de tenue de compte pour les clients actifs (au moins une transaction par mois). Des offres premium avec des services additionnels sont disponibles à partir de 7,90€/mois.",
  },
  {
    question: "Comment fonctionne le virement instantané ?",
    answer:
      "Le virement instantané SEPA vous permet de transférer de l'argent en moins de 10 secondes, 24h/24 et 7j/7, vers n'importe quel compte bancaire européen. Ce service est disponible depuis l'application mobile ou l'espace client en ligne.",
  },
  {
    question: "Mon argent est-il en sécurité chez CréditVert ?",
    answer:
      "Oui, vos dépôts sont garantis jusqu'à 100 000€ par le Fonds de Garantie des Dépôts et de Résolution (FGDR). De plus, toutes vos transactions sont sécurisées par notre système d'authentification forte conforme aux normes DSP2.",
  },
  {
    question: "Comment contacter un conseiller ?",
    answer:
      "Vous pouvez contacter votre conseiller par téléphone au 39 00 (du lundi au vendredi 8h-20h, samedi 9h-17h), par messagerie sécurisée depuis votre espace client, ou en prenant rendez-vous en agence. Un service d'urgence est disponible 24h/24 pour les questions liées à vos cartes.",
  },
  {
    question: "Puis-je gérer mes comptes depuis l'étranger ?",
    answer:
      "Absolument. Notre application mobile et votre espace client en ligne sont accessibles depuis partout dans le monde. Les paiements et retraits à l'étranger sont également possibles avec vos cartes bancaires, avec des conditions avantageuses selon votre offre.",
  },
  {
    question: "Comment obtenir un crédit immobilier ?",
    answer:
      "Pour une demande de prêt immobilier, vous pouvez utiliser notre simulateur en ligne pour une première estimation, puis prendre rendez-vous avec un conseiller spécialisé. Une réponse de principe est généralement donnée sous 48 heures après constitution de votre dossier.",
  },
]

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 bg-[#F5F7F8]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left sticky heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 lg:sticky lg:top-32 h-fit"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5EF] text-[#007A53] text-sm font-semibold w-fit">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="font-heading font-bold text-3xl sm:text-4xl text-foreground text-balance"
            >
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Vous avez d&apos;autres questions ? Notre équipe est disponible pour vous aider.
            </p>
            <Button
              className="bg-[#007A53] hover:bg-[#009E6D] text-white font-semibold rounded-full w-fit gap-2"
            >
              Centre d&apos;aide <ArrowRight className="size-4" />
            </Button>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Accordion className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="bg-white border border-border rounded-xl px-6 data-[state=open]:border-[#007A53]/30 data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-[#007A53] hover:no-underline py-5 gap-4 [&[data-state=open]]:text-[#007A53]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
