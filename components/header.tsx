"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="font-semibold text-slate-900 text-lg hidden sm:block">
              Gharlo Support
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Phone Number - Desktop */}
            <a
              href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              className="hidden lg:flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>9XXXX XXXXX</span>
            </a>

            {/* CTA Button */}
            <Button size="sm" className="hidden sm:flex">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Phone */}
              <a
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 py-2"
              >
                <Phone className="w-4 h-4" />
                <span>9XXXX XXXXX</span>
              </a>

              {/* Mobile CTA */}
              <Button className="w-full mt-2">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
