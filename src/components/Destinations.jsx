import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'

const destinations = [
  {
    id: 1,
    title: 'Paris 1889',
    epoch: 'Belle Époque',
    description: "Assistez à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle",
    price: '12 500',
    tags: ['Culture', 'Architecture', 'Gastronomie'],
    image: 'https://placehold.co/800x500/1a1a2e/D4AF37?text=Paris+1889',
  },
  {
    id: 2,
    title: 'Crétacé (-65M)',
    epoch: 'Ère des dinosaures',
    description: 'Observez les dinosaures dans leur habitat naturel, en toute sécurité',
    price: '18 900',
    tags: ['Aventure', 'Nature', 'Découverte'],
    image: 'https://placehold.co/800x500/1a1a2e/D4AF37?text=Cr%C3%A9tac%C3%A9+-65M',
  },
  {
    id: 3,
    title: 'Florence 1504',
    epoch: 'Renaissance italienne',
    description: 'Rencontrez Michel-Ange et assistez à la création du David',
    price: '14 200',
    tags: ['Art', 'Histoire', 'Architecture'],
    image: 'https://placehold.co/800x500/1a1a2e/D4AF37?text=Florence+1504',
  },
]

function DestinationCard({ destination, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.15 }}
      whileHover={{ scale: 1.03 }}
      className="group bg-dark-surface rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 sm:h-56">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/80 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-gold">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{destination.epoch}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-dark-text group-hover:text-gold transition-colors">
            {destination.title}
          </h3>
          <div className="flex items-center gap-1 text-gold/70">
            <MapPin className="w-4 h-4" />
          </div>
        </div>

        <p className="text-dark-text/60 text-sm mb-4 leading-relaxed">
          {destination.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-gold/10 text-gold border border-gold/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
          <div>
            <span className="text-2xl font-bold text-gold">{destination.price}€</span>
            <span className="text-dark-text/40 text-sm ml-1">/ voyageur</span>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors group/btn">
            Explorer
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Destinations() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-100px' })

  return (
    <section id="destinations" className="py-20 sm:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nos <span className="text-gold">Destinations</span>
          </h2>
          <p className="text-dark-text/50 text-lg max-w-2xl mx-auto">
            Trois époques extraordinaires vous attendent. Choisissez votre aventure temporelle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.id} destination={dest} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
