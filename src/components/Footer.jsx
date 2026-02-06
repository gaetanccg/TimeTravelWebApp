import { Clock, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'À propos', href: '#pourquoi' },
    { label: 'Quiz', href: '#quiz' },
  ]

  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer id="contact" className="bg-dark-surface/50 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <a href="#accueil" className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-gold" />
              <span className="logo-glow text-lg font-bold text-gold tracking-wide">
                TimeTravel Agency
              </span>
            </a>
            <p className="text-dark-text/40 text-sm leading-relaxed max-w-xs">
              Votre passerelle vers les époques les plus extraordinaires de l&apos;histoire.
              Voyagez en toute sécurité avec la technologie quantique de pointe.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-dark-text/50 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Suivez-nous
            </h4>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-gold/20 flex items-center justify-center text-dark-text/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gold/10 text-center">
          <p className="text-dark-text/30 text-sm">
            &copy; 2026 TimeTravel Agency — Tous droits (et toutes époques) réservés
          </p>
        </div>
      </div>
    </footer>
  )
}
