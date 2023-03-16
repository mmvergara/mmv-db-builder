import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles.ts';
import 'reactflow/dist/style.css';
import FlowPage from 'flow/ReFlowPage';
import { Notifications } from '@mantine/notifications';

function HomePage() {
  return <FlowPage />;
}

export default function App() {
  return (
    <MantineProvider
      theme={{
        colors: {
          'ocean-blue': [
            '#7AD1DD',
            '#5FCCDB',
            '#44CADC',
            '#2AC9DE',
            '#1AC2D9',
            '#11B7CD',
            '#09ADC3',
            '#0E99AC',
            '#128797',
            '#147885',
          ],
        },
      }}
    >
      <Notifications />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
