"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MapPin,
  Phone,
  User,
  Globe,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Comptes", href: "#" },
  { label: "Cartes", href: "#" },
  { label: "Épargne", href: "#" },
  { label: "Investissements", href: "#" },
  { label: "Crédits", href: "#" },
  { label: "Assurances", href: "#" },
  { label: "Banque au quotidien", href: "#" },
  { label: "Professionnels", href: "#" },
  { label: "Aide", href: "#" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "shadow-md" : ""
      )}
    >
      {/* Top utility bar */}
      <div className="bg-[#007A53] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 font-heading font-bold text-white text-lg tracking-tight">
              <div className="size-7 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#007A53] text-[9px] font-black leading-none text-center">CA</span>
              </div>
              Crédit Agricole
            </a>

            {/* Right utilities */}
            <div className="flex items-center gap-1">
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                <Search className="size-3.5" />
                <span className="hidden md:inline text-xs">Rechercher</span>
              </button>
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                <MapPin className="size-3.5" />
                <span className="hidden md:inline text-xs">Trouver une agence</span>
              </button>
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                <Phone className="size-3.5" />
                <span className="hidden md:inline text-xs">Contacter</span>
              </button>
              <div className="w-px h-4 bg-white/20 mx-1 hidden sm:block" />
              <a href="/login" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-[#007A53] font-semibold text-xs hover:bg-green-50 transition-colors">
                <User className="size-3.5" />
                <span>Se connecter</span>
              </a>
              <button className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-white/10 transition-colors text-white/80 text-xs ml-1">
                <Globe className="size-3.5" />
                <span>FR</span>
                <ChevronDown className="size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={cn(
          "bg-white border-b border-border transition-all duration-300",
          isScrolled ? "shadow-sm" : ""
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center" role="navigation" aria-label="Navigation principale">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setActiveItem(item.label)}
                  onMouseLeave={() => setActiveItem(null)}
                  className={cn(
                    "relative px-3 py-4 text-sm font-medium transition-colors whitespace-nowrap",
                    activeItem === item.label
                      ? "text-[#007A53]"
                      : "text-foreground hover:text-[#007A53]"
                  )}
                >
                  {item.label}
                  {activeItem === item.label && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007A53]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            {/* Mobile open account CTA */}
            <div className="hidden lg:block">
              <Button
                size="sm"
                className="bg-[#007A53] text-white hover:bg-[#009E6D] text-sm font-semibold rounded-full px-5"
              >
                Ouvrir un compte
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-border overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2.5 text-sm font-medium text-foreground hover:text-[#007A53] hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                <Button className="bg-[#007A53] text-white hover:bg-[#009E6D] w-full">
                  Ouvrir un compte
                </Button>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:bg-muted">
                    <MapPin className="size-4" /> Agences
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:bg-muted">
                    <Phone className="size-4" /> Contact
                  </button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
