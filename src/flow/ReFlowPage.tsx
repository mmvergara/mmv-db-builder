import { AppShell, Button, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import DrawerTable from 'components/FlowPage/DrawerTable';
import FlowHeader from 'components/FlowPage/Header';
import Markers from 'components/Markers';
import { config } from 'process';
import { useState } from 'react';
import { XYPosition } from 'reactflow';
import { nodePosition, RelationType, TableNodeType } from 'types/types';
import MainReactFlow from './MainReactFlow';

function FlowPage() {
  const [nodePositions, setNodePositions] = useState<nodePosition[]>([
    { nodeId: 'xx-vendors', position: { x: 0, y: 0 } },
    { nodeId: 'xx-vendor_contacts', position: { x: 250, y: 0 } },
  ]);
  const [savedNodePositions, setSavedNodePositions] = useState<nodePosition[]>(
    []
  );
  const [nodes, setNodes] = useState<TableNodeType[]>([
    {
      type: 'TableNode',
      id: 'xx-vendors',
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
      position: { x: 0, y: 0 },
    },
    {
      type: 'TableNode',
      id: 'xx-vendor_contacts',
      data: {
        tableName: 'xx-vendor_contacts',
        columns: [
          {
            colName: '11-vendor_id',
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
      position: { x: 250, y: 0 },
    },
  ]);

  const [relations, setRelations] = useState<RelationType[]>([
    {
      relationId: 'yoyoyo',
      sourceTable: 'xx-vendors',
      sourceKey: 'xx-vendors-11-id',
      targetTable: 'xx-vendor_contacts',
      targetKey: 'xx-vendor_contacts-11-vendor_id',
      relation: 'many-to-many',
    },
  ]);

  const removeRelationWhenNodeDeleted = (nodeId: string) => {
    setRelations((lastRelations) => {
      return lastRelations.filter(
        (r) => r.sourceTable !== nodeId && r.targetTable !== nodeId
      );
    });
  };

  const addRelation = (relation: RelationType) => {
    setRelations((lastRelations) => [...lastRelations, relation]);
  };

  const removeRelation = (relationId: string) => {
    setRelations((lastRelations) => {
      return lastRelations.filter((r) => r.relationId !== relationId);
    });
  };

  const updateTableName = (nodeId: string, newTableName: string) => {
    // update node id and data.tableName
    if (!newTableName) return;
    // if the new table name is already in use, return
    if (nodes.find((n) => n.id === newTableName)) {
      showNotification({ message: 'Table name already in use', color: 'red' });
      return;
    }
    setNodes((lastNodes) => {
      return lastNodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            id: newTableName,
            data: { ...n.data, tableName: newTableName },
          };
        }
        return n;
      });
    });
  };
  const updateColumnName = (
    nodeId: string,
    colIndex: number,
    newColName: string
  ) => {
    // update node id and data.tableName
    setNodes((lastNodes) => {
      return lastNodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              columns: n.data.columns.map((c, i) => {
                if (i === colIndex) {
                  return { ...c, colName: newColName };
                }
                return c;
              }),
            },
          };
        }
        return n;
      });
    });
  };
  const updateColumnDataType = (
    nodeId: string,
    colIndex: number,
    newColDataType: string
  ) => {
    setNodes((lastNodes) => {
      return lastNodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              columns: n.data.columns.map((c, i) => {
                if (i === colIndex) {
                  return { ...c, colDataType: newColDataType };
                }
                return c;
              }),
            },
          };
        }
        return n;
      });
    });
  };
  const updateColumnIsKey = (
    nodeId: string,
    colIndex: number,
    newColIsKey: boolean
  ) => {
    setNodes((lastNodes) => {
      return lastNodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              columns: n.data.columns.map((c, i) => {
                if (i === colIndex) {
                  return { ...c, colIsKey: newColIsKey };
                }
                return c;
              }),
            },
          };
        }
        return n;
      });
    });
  };
  const removeColumn = (nodeId: string, colName: string) => {
    setNodes((lastNodes) => {
      return lastNodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              columns: n.data.columns.filter((c) => c.colName !== colName),
            },
          };
        }
        return n;
      });
    });
  };
  const addTable = (tableName: string, position?: XYPosition) => {
    setNodes((lastNodes) => {
      return [
        ...lastNodes,
        {
          type: 'TableNode',
          id: tableName,
          data: {
            tableName,
            columns: [],
          },
          position: position || { x: 0, y: 0 },
        },
      ];
    });

    setNodePositions((lastNodePositions) => {
      return [
        ...lastNodePositions,
        { nodeId: tableName, position: position || { x: 0, y: 0 } },
      ];
    });
  };
  const addColumn = (nodeId: string) => {
    setNodes((lastNodes) => {
      return lastNodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              columns: [
                ...n.data.columns,
                {
                  colName: `col#${n.data.columns.length}`,
                  colDataType: 'int',
                  colIsKey: false,
                  colIsNullable: false,
                },
              ],
            },
          };
        }
        return n;
      });
    });
  };
  const removeTable = (nodeId: string) => {
    setNodes((lastNodes) => {
      return lastNodes.filter((n) => n.id !== nodeId);
    });
  };

  // edges will depend on relations and node defined on FlowPage
  // calculate edges willbe on MainReactFlow
  const onNodeDrag = (nodeId: string, newPosition: XYPosition) => {
    // if node is not in nodePositions, add it
    if (!savedNodePositions.find((n) => n.nodeId === nodeId)) {
      setSavedNodePositions((lastNodePositions) => {
        if (lastNodePositions.find((n) => n.nodeId === nodeId))
          return lastNodePositions;
        return [...lastNodePositions, { nodeId, position: newPosition }];
      });
      return;
    }
    // if node is in nodePositions, update it
    setSavedNodePositions((lastNodePositions) => {
      return lastNodePositions.map((n) => {
        if (n.nodeId === nodeId) return { ...n, position: newPosition };

        return n;
      });
    });
  };
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);
  return (
    <AppShell
      header={<FlowHeader drawerOpen={drawerOpen} drawerClose={drawerClose} />}
      styles={{ main: { padding: 0 } }}
    >
      <Markers />
      <Drawer
        size={320}
        opened={drawerOpened}
        withOverlay={false}
        onClose={drawerClose}
        withCloseButton={false}
        padding={0}
        shadow="sm"
      >
        <Drawer.Body m={0} p={0} h="100%">
          <Flex
            bg="ocean-blue"
            p={12.6}
            justify="space-between"
            style={{ overflow: 'hidden' }}
          >
            <Button
              color="ocean-blue"
              variant="white"
              onClick={() => {
                addTable(`table#${nodes.length}`, {
                  x: nodes.length * 100,
                  y: 0,
                });
              }}
            >
              Create Table
            </Button>{' '}
            <Button color="red" onClick={drawerClose}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825L9.425 14.6L8 16Z"
                  fill="#ffffff"
                />
              </svg>
            </Button>
          </Flex>
          {nodes.map((node, i) => {
            return (
              <DrawerTable
                node={node}
                index={i}
                addColumn={addColumn}
                removeColumn={removeColumn}
                removeTable={removeTable}
                updateColumnDataType={updateColumnDataType}
                updateColumnName={updateColumnName}
                updateColumnIsKey={updateColumnIsKey}
                updateTableName={updateTableName}
              />
            );
          })}
        </Drawer.Body>
      </Drawer>
      <MainReactFlow
        relations={relations}
        nodes={nodes}
        nodePositions={nodePositions}
        handleNodeDrag={onNodeDrag}
      />
    </AppShell>
  );
}

export default FlowPage;
