import './App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Realisations from '../pages/Realisations';
import Services from '../pages/Services';
import AboutPage from '../pages/AboutPage';
import Contact from '../pages/Contact'
import LoginPage from '../pages/LoginPage'
import Error404 from '../pages/Error404'
import Dashboard from '../pages/Dashboard'
import LegalMentions from '../pages/LegalMentions'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/realisations" element={<Realisations />} />
                <Route path="/services" element={<Services />} />
                <Route path="/a-propos" element={<AboutPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/connexion" element={<LoginPage />} />
                <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
                <Route path="/legal" element={<LegalMentions />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
