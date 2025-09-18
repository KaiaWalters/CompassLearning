import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/navbar.jsx'
import Hero from './components/Hero/hero.jsx'
import LearningGoalsPage from './pages/LearningGoalsPage.jsx'

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={
            <>
              <section id="home">
                <Hero/>
              </section>
              <section id="how-it-works">
                <div className="container">
                  <div className="features-section">
                    <h2>How It Works</h2>
                    <div className="features-grid">
                      <div className="feature-card">
                        <h3>1. Define Your Goals</h3>
                        <p>Tell us what you want to learn and achieve</p>
                      </div>
                      <div className="feature-card">
                        <h3>2. AI Analysis</h3>
                        <p>Our AI analyzes your preferences and creates a personalized plan</p>
                      </div>
                      <div className="feature-card">
                        <h3>3. Start Learning</h3>
                        <p>Follow your customized learning path to success</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          } />
          <Route path="/learning-goals" element={<LearningGoalsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
