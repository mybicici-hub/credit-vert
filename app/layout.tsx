import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crédit Agricole — Votre Banque de Confiance',
  description:
    'Crédit Agricole, la banque française au service de votre avenir. Comptes, crédits, épargne, assurances et solutions digitales pour particuliers et professionnels.',
  keywords: 'banque, crédit, épargne, assurance, prêt immobilier, carte bancaire, banque en ligne, crédit agricole',
  authors: [{ name: 'Crédit Agricole' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Crédit Agricole — Votre Banque de Confiance',
    description: 'La banque française au service de votre avenir.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport: Viewport = {
  themeColor: '#007A53',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable} bg-background`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
