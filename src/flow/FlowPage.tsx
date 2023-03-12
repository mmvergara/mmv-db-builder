import { AppShell, Button, Flex, Header } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DrawerControl from 'components/drawerControl';
import Markers from 'components/Markers';
import { calculateEdges } from 'helpers/calculateEdges';
import { setNodesHandleType } from 'helpers/setNodesHandleType';
import { useCallback, useEffect, useState } from 'react';
import {
  applyNodeChanges,
  Background,
  Controls,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
} from 'reactflow';
import { CustomNode, CustomNodeColumn, Relation } from 'types/types';
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
    relation: 'one-to-many',
  },
  {
    sourceTable: 'xx-vendors',
    sourceKey: '22-vendor_name',
    targetTable: 'zz-transactions',
    targetKey: '55-amount',
    relation: 'many-to-many',
  },
];

function FlowPage() {
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const [relations, setRelations] = useState<Relation[]>(initialRelations);
  const [nodes, setNodes] = useState(
    setNodesHandleType(initialNodes, relations)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    calculateEdges(nodes, relations)
  );

  const refreshEdges = () => {
    console.log('refreshing edges');
    const settedNodes = setNodesHandleType(nodes, relations);
    setEdges(calculateEdges(settedNodes, relations));
  };

  const updateColumnProperties = (
    tableName: string,
    oldColName: string,
    newColProperties: CustomNodeColumn
  ) => {
    setNodes((nds) => {
      const newNodes = nds.map((node) => {
        if (node.id === tableName) {
          const newColumns = node.data.columns.map((col) => {
            if (col.colName === oldColName) {
              return newColProperties;
            }
            return col;
          });
          return {
            ...node,
            data: { ...node.data, columns: newColumns },
          };
        }
        return node;
      });

      let NewRelations: Relation[] = [];

      setRelations((rs) => {
        NewRelations = rs.map((r) => {
          let { sourceKey, targetKey } = r;
          if (r.sourceTable === tableName && r.sourceKey === oldColName) {
            sourceKey = newColProperties.colName;
          } else {
            // console.log('failed to change name');
          }
          if (r.targetTable === tableName && r.targetKey === oldColName) {
            targetKey = newColProperties.colName;
          } else {
            // console.log('failed to change name');
          }
          return { ...r, sourceKey, targetKey };
        });
        return NewRelations;
      });
      console.log('HERE NOW');
      const settedNodes = setNodesHandleType(newNodes, NewRelations);
      setEdges(calculateEdges(settedNodes, NewRelations));
      return settedNodes;
    });
    console.log('refreshing edges');
    refreshEdges();
  };
  const updateTableName = (oldName: string, newName: string) => {
    setNodes((nds) => {
      const newNodes = nds.map((node) => {
        if (node.id === oldName) {
          return {
            ...node,
            id: newName,
            data: { ...node.data, tableName: newName },
          };
        }
        return node;
      });

      let newRelations: Relation[] = [];
      setRelations((rs) => {
        newRelations = rs.map((r) => {
          let { sourceTable, targetTable } = r;
          if (r.sourceTable === oldName) {
            sourceTable = newName;
          }
          if (r.targetTable === oldName) {
            targetTable = newName;
          }
          return { ...r, sourceTable, targetTable };
        });
        return newRelations;
      });

      const settedNodes = setNodesHandleType(newNodes, newRelations);
      setEdges(calculateEdges(settedNodes, newRelations));
      console.log("RETURNED FROM 'updateTableName");
      return settedNodes;
    });
    refreshEdges();
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      return setNodes((nds) => {
        const newNodes = applyNodeChanges(changes, nds);
        const settedNodes = setNodesHandleType(newNodes, relations);
        setEdges(calculateEdges(settedNodes, relations));
        console.log('CODE ON NODES CHANGE');
        return settedNodes;
      });
    },
    [setNodes, relations, setEdges]
  );

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
      <DrawerControl
        nodes={nodes}
        updateTableName={updateTableName}
        updateColumnProperties={updateColumnProperties}
        size={320}
        opened={drawerOpened}
        withOverlay={false}
        onClose={drawerClose}
        withCloseButton={false}
        padding={0}
        shadow="sm"
      />
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeType}
          defaultViewport={{ zoom: 1, x: 100, y: 0 }}
          onMove={(e, v) => console.log(v)}
        >
          <Background gap={[4, 4]} color="white" />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </AppShell>
  );
}

export default FlowPage;
