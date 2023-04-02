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
          cyanGreen: [
            '#E6F8F3',
            '#C1EDE3',
            '#98E1D2',
            '#6FD4C2',
            '#4CC7B4',
            '#00B5A5',
            '#009E92',
            '#00867F',
            '#006D6C',
            '#004F52',
          ],
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
