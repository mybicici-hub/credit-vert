"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Calendar, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactOptions = [
  {
    icon: Phone,
    title: "Par téléphone",
    description: "Du lundi au vendredi, 8h-20h\nSamedi, 9h-17h",
    cta: "39 00",
    ctaLabel: "Appeler le 39 00",
    href: "tel:3900",
  },
  {
    icon: MapPin,
    title: "Trouver une agence",
    description: "2 200+ agences en France. Trouvez la plus proche de chez vous.",
    cta: "Trouver une agence",
    ctaLabel: "Trouver une agence",
    href: "#",
  },
  {
    icon: Calendar,
    title: "Prendre rendez-vous",
    description: "Rencontrez votre conseiller en agence ou en visioconférence.",
    cta: "Réserver un créneau",
    ctaLabel: "Prendre rendez-vous",
    href: "#",
  },
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-20 bg-white"
      aria-labelledby="contact-heading"
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
            Contact
          </span>
          <h2
            id="contact-heading"
            className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4 text-balance"
          >
            Nous sommes là pour vous aider
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choisissez le moyen de contact qui vous convient le mieux.
          </p>
        </motion.div>

        {/* Contact options */}
        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {contactOptions.map((opt, index) => {
            const Icon = opt.icon
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#F5F7F8] rounded-2xl p-6 flex flex-col gap-4 text-center items-center hover:bg-[#E8F5EF]/60 transition-colors"
              >
                <div className="size-14 rounded-2xl bg-[#E8F5EF] flex items-center justify-center">
                  <Icon className="size-7 text-[#007A53]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    {opt.title}
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {opt.description}
                  </p>
                </div>
                <a
                  href={opt.href}
                  aria-label={opt.ctaLabel}
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#007A53] text-[#007A53] text-sm font-semibold hover:bg-[#007A53] hover:text-white transition-colors"
                >
                  {opt.cta}
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[#F5F7F8] rounded-2xl p-8">
            <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
              Envoyer un message
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle className="size-14 text-[#007A53]" />
                <h4 className="font-heading font-semibold text-xl text-foreground">
                  Message envoyé !
                </h4>
                <p className="text-muted-foreground">
                  Notre équipe vous répondra dans les 24 heures ouvrées.
                </p>
                <Button
                  variant="outline"
                  className="border-[#007A53] text-[#007A53]"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                      Nom complet <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jean Dupont"
                      className="bg-white border-border focus-visible:ring-[#007A53]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jean@exemple.fr"
                      className="bg-white border-border focus-visible:ring-[#007A53]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
                    Sujet <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="contact-subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="bg-white border-border focus-visible:ring-[#007A53]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre demande en détail..."
                    rows={5}
                    className="bg-white border-border focus-visible:ring-[#007A53] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#007A53] hover:bg-[#009E6D] text-white font-semibold rounded-xl gap-2 mt-2"
                  size="lg"
                >
                  <Send className="size-4" />
                  Envoyer le message
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
