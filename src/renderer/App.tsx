import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles.ts';
import 'reactflow/dist/style.css';
import FlowPage from 'flow/ReFlowPage';

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
