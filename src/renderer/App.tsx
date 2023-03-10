import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import 'reactflow/dist/style.css';
import './App.css';
import './MainStyles.scss';
import Visualizer from 'Visualizer';
import databases from 'config/databases';

function Database() {
  const databaseNames = Object.keys(databases);
  const databaseName = databaseNames[0];

  return <Visualizer database={databaseName} />;
}

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<Database />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
