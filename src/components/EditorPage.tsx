import ReactFlow, { Controls, Background } from 'reactflow';
import { AppShell, Navbar, Header } from '@mantine/core';
import { useMemo } from 'react';
import TableNode from './Editor/TableNode';

const edges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

const nodes = [
  {
    id: '1',
    type: 'TableNode',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: '2',
    type: 'TableNode',
    position: { x: 500, y: 0 },
    data: { value: 124443 },
  },
];

function Editor() {
  const nodeTypes = useMemo(() => ({ TableNode }), []);
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100vh" p="xs">
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
    >
      <div style={{ height: '90vh', width: '76vw' }}>
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </AppShell>
  );
}

export default Editor;
