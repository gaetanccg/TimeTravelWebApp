import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Compass, RotateCcw } from 'lucide-react'

const questions = [
  {
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: 'Culturelle', scores: { paris: 2, cretace: 0, florence: 1 } },
      { label: 'Aventure', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Élégance', scores: { paris: 1, cretace: 0, florence: 2 } },
    ],
  },
  {
    question: 'Votre période préférée ?',
    options: [
      { label: 'Moderne XIXe', scores: { paris: 2, cretace: 0, florence: 0 } },
      { label: 'Temps anciens', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Renaissance', scores: { paris: 0, cretace: 0, florence: 2 } },
    ],
  },
  {
    question: 'Vous préférez :',
    options: [
      { label: 'Effervescence urbaine', scores: { paris: 2, cretace: 0, florence: 1 } },
      { label: 'Nature sauvage', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Art et architecture', scores: { paris: 1, cretace: 0, florence: 2 } },
    ],
  },
  {
    question: 'Votre activité idéale :',
    options: [
      { label: 'Monuments', scores: { paris: 2, cretace: 0, florence: 1 } },
      { label: 'Faune', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Musées', scores: { paris: 1, cretace: 0, florence: 2 } },
    ],
  },
]

const results = {
  paris: {
    title: 'Paris 1889',
    emoji: '🗼',
    description:
      "Vous êtes un voyageur curieux, passionné par la culture et l'effervescence urbaine. Paris pendant la Belle Époque est faite pour vous ! Assistez à l'inauguration de la Tour Eiffel et vivez l'Exposition Universelle.",
    price: '12 500€',
  },
  cretace: {
    title: 'Crétacé (-65M)',
    emoji: '🦕',
    description:
      "L'aventure coule dans vos veines ! Vous êtes fait pour explorer le monde préhistorique. Observez les dinosaures dans leur habitat naturel, une expérience unique et inoubliable.",
    price: '18 900€',
  },
  florence: {
    title: 'Florence 1504',
    emoji: '🎨',
    description:
      "Vous avez l'âme d'un artiste et le goût du raffinement. La Renaissance italienne vous attend ! Rencontrez Michel-Ange et découvrez la création du David dans l'atelier du maître.",
    price: '14 200€',
  },
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ paris: 0, cretace: 0, florence: 0 })
  const [showResult, setShowResult] = useState(false)
  const [started, setStarted] = useState(false)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleAnswer = (option) => {
    const newScores = {
      paris: scores.paris + option.scores.paris,
      cretace: scores.cretace + option.scores.cretace,
      florence: scores.florence + option.scores.florence,
    }
    setScores(newScores)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const getResult = () => {
    const maxKey = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0]
    return results[maxKey]
  }

  const reset = () => {
    setCurrentQuestion(0)
    setScores({ paris: 0, cretace: 0, florence: 0 })
    setShowResult(false)
    setStarted(false)
  }

  return (
    <section id="quiz" className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trouvez votre <span className="text-gold">destination idéale</span>
          </h2>
          <p className="text-dark-text/50 text-lg">
            Répondez à 4 questions pour découvrir l&apos;époque qui vous correspond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="bg-dark-surface rounded-2xl border border-gold/10 p-6 sm:p-10 min-h-[360px] flex flex-col"
        >
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <Compass className="w-16 h-16 text-gold mb-6" />
                <h3 className="text-2xl font-bold mb-3">Quiz de recommandation</h3>
                <p className="text-dark-text/50 mb-8 max-w-md">
                  4 questions rapides pour déterminer quelle époque est faite pour vous.
                </p>
                <button
                  onClick={() => setStarted(true)}
                  className="btn-gold px-8 py-3 rounded-full text-base"
                >
                  Commencer le quiz
                </button>
              </motion.div>
            ) : showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  {getResult().emoji}
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gold mb-2">
                  {getResult().title}
                </h3>
                <p className="text-dark-text/60 mb-4 max-w-lg leading-relaxed">
                  {getResult().description}
                </p>
                <p className="text-gold text-xl font-semibold mb-6">
                  À partir de {getResult().price} / voyageur
                </p>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-dark-text/50 hover:text-gold transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Recommencer le quiz
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex-1 flex flex-col"
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-dark-text/40 text-sm">
                    Question {currentQuestion + 1} / {questions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${
                          i <= currentQuestion ? 'bg-gold' : 'bg-dark-text/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-center">
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="flex flex-col gap-3 flex-1 justify-center max-w-md mx-auto w-full">
                  {questions[currentQuestion].options.map((option, i) => (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className="w-full py-4 px-6 rounded-xl border border-gold/20 bg-dark-bg/50 text-dark-text hover:border-gold hover:bg-gold/5 transition-all duration-300 text-left font-medium"
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
