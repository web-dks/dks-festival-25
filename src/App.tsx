import { Header } from './components/Header';
import { VerticalTimeline } from './components/VerticalTimeline';
import { Footer } from './components/Footer';
import './styles/globals.css';
import './App.css';

function App() {
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

export default App;
