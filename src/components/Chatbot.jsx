import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Settings, ArrowLeft, Loader2 } from 'lucide-react'

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton ton : professionnel, chaleureux, passionné d'histoire, enthousiaste mais pas familier.
Tu connais parfaitement :

Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle, prix 12 500€)
Crétacé -65M (dinosaures, nature préhistorique, prix 18 900€)
Florence 1504 (Renaissance, Michel-Ange, David, prix 14 200€)
Tu conseilles les clients, réponds aux questions sur les destinations, les prix, la sécurité temporelle, et tu peux recommander une destination selon les intérêts du client. Réponds toujours en français.`

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: 'Bonjour ! Je suis votre guide temporel. Comment puis-je vous aider ?',
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    if (!apiKey.trim()) {
      setShowSettings(true)
      return
    }

    const userMessage = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const apiMessages = updatedMessages
        .filter((m) => m !== WELCOME_MESSAGE)
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `Erreur API (${response.status})`)
      }

      const data = await response.json()
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Désolé, une erreur est survenue : ${error.message}. Vérifiez votre clé API dans les paramètres.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-gold/20 transition-colors duration-300 ${
          isOpen ? 'bg-dark-surface border border-gold/20' : 'btn-gold'
        }`}
        aria-label="Ouvrir le chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gold" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[70vh] bg-dark-bg rounded-2xl border border-gold/20 shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold/10 bg-dark-surface">
              {showSettings ? (
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex items-center gap-2 text-dark-text/70 hover:text-gold transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-dark-text">Guide Temporel</span>
                </div>
              )}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-dark-text/50 hover:text-gold transition-colors"
                aria-label="Paramètres"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {showSettings ? (
              /* Settings View */
              <div className="flex-1 p-4 flex flex-col">
                <h3 className="text-sm font-semibold text-gold mb-4">Paramètres</h3>
                <label className="text-xs text-dark-text/50 mb-2 block">
                  Clé API Anthropic
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full px-3 py-2 rounded-lg bg-dark-surface border border-gold/20 text-dark-text text-sm placeholder:text-dark-text/30 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <p className="text-xs text-dark-text/30 mt-2">
                  Votre clé est stockée uniquement dans la mémoire du navigateur et n&apos;est jamais persistée.
                </p>
                <button
                  onClick={() => setShowSettings(false)}
                  className="mt-4 btn-gold px-4 py-2 rounded-lg text-sm"
                >
                  Enregistrer
                </button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gold/20 text-dark-text rounded-br-md'
                            : 'bg-dark-surface text-dark-text/80 rounded-bl-md border border-gold/10'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-dark-surface text-dark-text/60 px-4 py-3 rounded-2xl rounded-bl-md border border-gold/10">
                        <Loader2 className="w-4 h-4 animate-spin text-gold" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gold/10">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Posez-moi vos questions sur les voyages temporels..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-dark-surface border border-gold/10 text-dark-text text-sm placeholder:text-dark-text/30 focus:outline-none focus:border-gold/30 transition-colors"
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isLoading || !input.trim()}
                      className="p-2.5 rounded-xl btn-gold disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Envoyer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
