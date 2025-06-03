import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "A.B Livestocks - Premium Goats for Sale",
  description:
    "Al Baraqah Livestocks - Browse our premium collection of goats available for sale. Quality livestock with detailed information and videos.",
  keywords: "goats, livestock, breeding, farm animals, A.B Livestocks, Al Baraqah",
  authors: [{ name: "A.B Livestocks" }],
  openGraph: {
    title: "A.B Livestocks - Premium Goats for Sale",
    description: "Browse our premium collection of goats available for sale",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "A.B Livestocks - Premium Goats for Sale",
    description: "Browse our premium collection of goats available for sale",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
