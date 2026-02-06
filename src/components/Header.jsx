import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Clock } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'À propos', href: '#pourquoi' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/90 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2 group">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-gold group-hover:rotate-180 transition-transform duration-700" />
            <span className="logo-glow text-lg sm:text-xl font-bold text-gold tracking-wide">
              TimeTravel Agency
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-dark-text/80 hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quiz"
              className="btn-gold px-5 py-2 rounded-full text-sm tracking-wide"
            >
              Réserver un voyage
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-dark-text hover:text-gold transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-dark-surface/95 backdrop-blur-md border-t border-gold/10"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-dark-text/80 hover:text-gold transition-colors py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quiz"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block btn-gold px-5 py-2 rounded-full text-sm text-center mt-2"
            >
              Réserver un voyage
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
