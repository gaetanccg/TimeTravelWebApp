import Header from './components/Header'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import WhyUs from './components/WhyUs'
import Quiz from './components/Quiz'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <WhyUs />
        <Quiz />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
