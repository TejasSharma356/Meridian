import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Intelligence from './pages/Intelligence';
import Architect from './pages/Architect';
import Build from './pages/Build';
import Portfolio from './pages/Portfolio';
import Apply from './pages/Apply';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import Support from './pages/Support';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: 'var(--surface-container-highest)',
          color: 'var(--on-surface)',
          border: '1px solid rgba(65, 71, 84, 0.15)',
        }
      }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="intelligence" element={<Intelligence />} />
          <Route path="architect" element={<Architect />} />
          <Route path="build" element={<Build />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="apply" element={<Apply />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
