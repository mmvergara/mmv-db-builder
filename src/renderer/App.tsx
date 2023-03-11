import { MantineProvider } from '@mantine/core';
import FlowPage from 'flow/FlowPage';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './MainStyles.scss';
import 'reactflow/dist/style.css';
import './styles.ts';

function HomePage() {
  return <FlowPage />;
}

export default function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
