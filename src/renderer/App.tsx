import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Editor from 'components/EditorPage';
import 'reactflow/dist/style.css';
import './App.css';
import './MainStyles.scss';
import HomePage from 'components/HomePage';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
