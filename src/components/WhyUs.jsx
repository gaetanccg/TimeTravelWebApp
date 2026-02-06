import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Users, Atom, RotateCcw } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Sécurité temporelle',
    description: 'Protocoles de sécurité avancés pour chaque voyage. Votre intégrité physique et temporelle est notre priorité absolue.',
  },
  {
    icon: Users,
    title: 'Guides experts',
    description: 'Des historiens et scientifiques certifiés vous accompagnent à chaque époque pour une immersion authentique.',
  },
  {
    icon: Atom,
    title: 'Technologie quantique',
    description: 'Notre technologie de déplacement temporel brevetée assure des transitions fluides et précises à la seconde près.',
  },
  {
    icon: RotateCcw,
    title: 'Retour garanti',
    description: "Garantie de retour à votre époque d'origine. Assurance temporelle complète incluse dans chaque voyage.",
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="text-center p-6 sm:p-8 rounded-2xl bg-dark-bg/50 border border-gold/10 hover:border-gold/25 transition-all duration-300"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 mb-5">
        <feature.icon className="w-7 h-7 text-gold" />
      </div>
      <h3 className="text-lg font-semibold mb-3 text-dark-text">
        {feature.title}
      </h3>
      <p className="text-dark-text/50 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  )
}

export default function WhyUs() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-100px' })

  return (
    <section id="pourquoi" className="py-20 sm:py-28 px-4 bg-dark-surface/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Pourquoi <span className="text-gold">nous choisir</span>
          </h2>
          <p className="text-dark-text/50 text-lg max-w-2xl mx-auto">
            Une expertise inégalée dans le voyage temporel, au service de votre sécurité et de votre émerveillement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
