import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { VerticalTimeline } from './components/VerticalTimeline';
import { Footer } from './components/Footer';
import { Ativacoes } from './pages/Ativacoes';
import './styles/globals.css';
import './App.css';

function HomePage() {
  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <VerticalTimeline />
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ativacoes" element={<Ativacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
