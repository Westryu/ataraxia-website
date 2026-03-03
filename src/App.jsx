import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurJourney from './pages/OurJourney';
import OurRules from './pages/OurRules';
import OurLocation from './pages/OurLocation';
import OurWOD from './pages/OurWOD';
import OurGallery from './pages/OurGallery';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/journey" element={<OurJourney />} />
            <Route path="/rules" element={<OurRules />} />
            <Route path="/location" element={<OurLocation />} />
            <Route path="/wod" element={<OurWOD />} />
            <Route path="/gallery" element={<OurGallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
