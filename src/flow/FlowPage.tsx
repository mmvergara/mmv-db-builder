import { AppShell, Button, Flex, Header } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DrawerControl from 'components/drawerControl';
import Markers from 'components/Markers';
import { calculateEdges } from 'helpers/calculateEdges';
import { useCallback, useEffect, useState } from 'react';
import {
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
} from 'reactflow';
import { Relation } from 'types/types';
import nodeType from './CustomTableNode';

const initialNodes = [
  {
    id: 'xx-vendors',
    type: 'TableNode',
    data: {
      tableName: 'xx-vendors',
      columns: [
        {
          colName: '11-id',
          colDataType: 'int',
          colIsKey: true,
          colIsNullable: false,
        },
        {
          colName: '22-vendor_name',
          colDataType: 'int',
          colIsKey: false,
          colIsNullable: false,
        },
      ],
    },
    position: { x: 250, y: 5 },
  },
  {
    id: 'zz-transactions',
    type: 'TableNode',
    data: {
      tableName: 'zz-transactions',
      columns: [
        {
          colName: '33-id',
          colDataType: 'int',
          colIsKey: true,
          colIsNullable: false,
        },
        {
          colName: '44-vendor_id',
          colDataType: 'int',
          colIsKey: false,
          colIsNullable: false,
        },
        {
          colName: '55-amount',
          colDataType: 'int',
          colIsKey: false,
          colIsNullable: false,
        },
      ],
    },
    position: { x: 100, y: 100 },
  },
];

const initialRelations: Relation[] = [
  {
    sourceTable: 'xx-vendors',
    sourceKey: '11-id',
    targetTable: 'zz-transactions',
    targetKey: '44-vendor_id',
    relation: 'many-to-one',
  },
];

function FlowPage() {
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const [relations, setRelations] = useState<Relation[]>(initialRelations);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onNodesChange = useCallback(
    (changes) => {
      return setNodes((nds) => {
        const newNodes = applyNodeChanges(changes, nds);
        setEdges(calculateEdges(newNodes, relations));
        return newNodes;
      });
    },
    [setNodes]
  );

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
