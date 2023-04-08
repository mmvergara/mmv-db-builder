import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DiagramPage from 'pages/DiagramPage';
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <Router>
      <Notifications />
      <Routes>
        <Route path="/" element={<DiagramPage />} />
      </Routes>
    </Router>
  );
}
