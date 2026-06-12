"use client"

import { motion } from "framer-motion"
import { Bell, Send, CreditCard, Eye, Smartphone, Star } from "lucide-react"
import Image from "next/image"

const features = [
  { icon: Eye, label: "Aperçu du compte", desc: "Soldes et mouvements en temps réel" },
  { icon: Send, label: "Virements", desc: "Transferts instantanés vers vos proches" },
  { icon: Smartphone, label: "Paiement mobile", desc: "Apple Pay, Google Pay intégrés" },
  { icon: Bell, label: "Notifications", desc: "Alertes personnalisables pour chaque opération" },
  { icon: CreditCard, label: "Carte digitale", desc: "Gérez et bloquez votre carte instantanément" },
]

const storeRatings = {
  appStore: { rating: 4.8, reviews: "128k" },
  googlePlay: { rating: 4.7, reviews: "95k" },
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note: ${count} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < Math.floor(count) ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
        />
      ))}
    </div>
  )
}

export function MobileAppSection() {
  return (
    <section
      id="application"
      className="py-20 bg-[#007A53] overflow-hidden"
      aria-labelledby="app-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-sm font-semibold w-fit">
                Application mobile
              </span>
              <h2
                id="app-heading"
                className="font-heading font-bold text-3xl sm:text-4xl text-white text-balance"
              >
                Votre banque dans votre poche, 24h/24
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Gérez toutes vos finances depuis l&apos;application Crédit Agricole.
                Simple, sécurisée et disponible partout, à toute heure.
              </p>
            </div>

            {/* Feature list */}
            <ul className="flex flex-col gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.li
                    key={feature.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="size-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{feature.label}</p>
                      <p className="text-white/65 text-sm">{feature.desc}</p>
                    </div>
                  </motion.li>
                )
              })}
            </ul>

            {/* Store buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* App Store */}
              <a
                href="#"
                className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:bg-gray-900 transition-colors group"
                aria-label="Télécharger sur l'App Store"
              >
                <svg viewBox="0 0 24 24" className="size-7 fill-white flex-shrink-0" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-xs text-white/70">Télécharger sur</div>
                  <div className="font-semibold text-sm">App Store</div>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <Stars count={storeRatings.appStore.rating} />
                  <p className="text-xs text-white/60 mt-0.5">{storeRatings.appStore.rating} · {storeRatings.appStore.reviews} avis</p>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:bg-gray-900 transition-colors group"
                aria-label="Disponible sur Google Play"
              >
                <svg viewBox="0 0 24 24" className="size-7 fill-white flex-shrink-0" aria-hidden="true">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6L4.6 21.3c-.66.5-1.6.03-1.6-.8zM5 7.14V16.86L13.34 12 5 7.14z"/>
                </svg>
                <div>
                  <div className="text-xs text-white/70">Disponible sur</div>
                  <div className="font-semibold text-sm">Google Play</div>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <Stars count={storeRatings.googlePlay.rating} />
                  <p className="text-xs text-white/60 mt-0.5">{storeRatings.googlePlay.rating} · {storeRatings.googlePlay.reviews} avis</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 rounded-full bg-white/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative max-w-xs w-full">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20 aspect-[9/19]">
                <Image
                  src="/images/mobile-app.png"
                  alt="Application mobile Crédit Agricole — aperçu du compte et transactions"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Notification bubble */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -right-4 top-16 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2"
              >
                <div className="size-8 rounded-full bg-[#E8F5EF] flex items-center justify-center">
                  <Bell className="size-4 text-[#007A53]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Virement reçu</p>
                  <p className="text-xs text-[#007A53] font-bold">+250,00 €</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
