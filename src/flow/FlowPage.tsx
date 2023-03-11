import { AppShell, Button, Flex, Header } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DrawerControl from 'components/drawerControl';
import Markers from 'components/Markers';
import { calculateEdges } from 'helpers/calculateEdges';
import { useEffect, useState } from 'react';
import {
  Background,
  Controls,
  Edge,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { CustomEdge, Relation } from 'types/types';
import nodeType from './CustomTableNode';

const initialNodes = [
  {
    id: 'orders',
    type: 'TableNode',
    data: {
      tableName: 'orders',
      columns: [
        {
          colName: 'id',
          colDataType: 'int',
          colIsKey: true,
          colIsNullable: false,
        },
        {
          colName: 'customer_id',
          colDataType: 'int',
          colIsKey: false,
          colIsNullable: false,
        },
      ],
    },
    position: { x: 250, y: 5 },
  },
  {
    id: 'products',
    type: 'TableNode',
    data: {
      tableName: 'products',
      columns: [
        {
          colName: 'id',
          colDataType: 'int',
          colIsKey: true,
          colIsNullable: false,
        },
        {
          colName: 'name',
          colDataType: 'varchar',
          colIsKey: false,
          colIsNullable: false,
        },
      ],
    },
    position: { x: 100, y: 100 },
  },
];

// const initialEdges: CustomEdge = [
//   {
//     id: 'edge-1',
//     source: 'orders',
//     target: 'products',
//     sourceHandle: 'id-right',
//     targetHandle: 'id-left',
//     type: 'smoothstep',
//     markerStart: 'hasManyReversed',
//     markerEnd: 'hasManyReversed',
//   },
// ];

const initialRelations: Relation[] = [
  { sourceTable: 'orders', targetTable: 'products', relation: 'hasMany' },
];

function FlowPage() {
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const [relations, setRelations] = useState<Relation[]>(initialRelations);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log(nodes);
  useEffect(() => {
    setEdges(calculateEdges(nodes, relations));
  }, []);

  return (
    <AppShell
      header={
        <Header
          withBorder={false}
          height={{ base: 61 }}
          p="md"
          bg="#38235c"
          style={{ boxShadow: '0px 1px 5px gray' }}
        >
          <Flex
            style={{
              alignItems: 'center',
              height: '100%',
              gap: '20px',
            }}
          >
            <Button onClick={drawerOpen}>Show Controls</Button>
            <Button onClick={drawerOpen} variant="light">
              Export Database
            </Button>
          </Flex>
        </Header>
      }
    >
      <Markers />
      <ReactFlowProvider>
        <DrawerControl
          size={320}
          opened={drawerOpened}
          withOverlay={false}
          onClose={drawerClose}
          withCloseButton={false}
          padding={0}
          shadow="sm"
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeType}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </AppShell>
  );
}

export default FlowPage;
