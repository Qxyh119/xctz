import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PasswordGate from './components/PasswordGate';
import Header from './components/Header';
import About from './pages/About';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import Blog from './pages/Blog';
import Article from './pages/Article';
import './App.css';

function AppContent() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('unlocked') === 'true'
  );

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>© 2026 我的作品集 · 请勿外传</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
