import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DiagramPage from 'pages/DiagramPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiagramPage />} />
      </Routes>
    </Router>
  );
}
