import { nodeTypes } from 'config/nodeTypes';
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  Controls,
  ControlButton,
  Background,
  useStoreApi,
  ReactFlowProvider,
  getConnectedEdges,
  OnSelectionChangeParams,
  NodeChange,
  getIncomers,
  getOutgoers,
  ReactFlowInstance,
} from 'reactflow';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Group,
  Collapse,
  Box,
  Drawer,
  Divider,
  Paper,
  Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  MaximizeIcon,
  MinimizeIcon,
  InfoIcon,
  InfoPopup,
  Markers,
} from './components';

import {
  edgeClassName,
  edgeMarkerName,
  calculateTargetPosition,
  calculateSourcePosition,
  initializeNodes,
  moveSVGInFront,
  setHighlightEdgeClassName,
  logTablePositions,
  setEdgeClassName,
  loadDatabases,
} from './helpers';

import { EdgeConfig, DatabaseConfig } from './types';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';
import './Style';
import DatabaseIcon from './components/DatabaseIcon';
import { DatabaseMenuPopup } from './components/DatabaseMenuPopup';
import calculateEdges from './helpers/calculateEdges';
import NavCollapseTable from './NavCollapseTable';

interface FlowProps {
  currentDatabase: DatabaseConfig;
}

interface VisualizerProps {
  // eslint-disable-next-line react/require-default-props
  database?: string;
}

function Flow(props: FlowProps) {
  const { currentDatabase } = props;
  const initialNodes = initializeNodes(currentDatabase);
  const store = useStoreApi();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [fullscreenOn, setFullScreen] = useState(false);
  const [infoPopupOn, setInfoPopupOn] = useState(false);
  const [unknownDatasetOn, setUnknownDatasetOn] = useState(false);
  const [databaseMenuPopupOn, setDatabaseMenuPopupOn] = useState(false);
  const [nodeHoverActive, setNodeHoverActive] = useState(true);

  const onInit = (instance: ReactFlowInstance) => {
    const noder = instance.getNodes();
    console.log({ noder });
    const initialEdges = calculateEdges(noder, currentDatabase);
    setEdges(() => initialEdges);

    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        const nodez = instance.getNodes();

        logTablePositions(nodez);
      }
    };

    document.addEventListener('keydown', handleKeyboard);

    // https://javascriptf1.com/snippet/detect-fullscreen-mode-with-javascript
    window.addEventListener('resize', (event) => {
      setFullScreen(window.innerHeight === window.screen.height);
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setInfoPopupOn(false);
        setUnknownDatasetOn(false);
        setDatabaseMenuPopupOn(false);
      }
    });

    // https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
    document.addEventListener('click', (event: Event) => {
      const popup = document.querySelector('.info-popup');

      if (!popup) {
        return;
      }

      const target = event.target as HTMLInputElement;

      if (target && target.closest('.into-popup-toggle')) {
        return;
      }

      if (target && !target.closest('.info-popup__inner')) {
        setInfoPopupOn(false);
        setUnknownDatasetOn(false);
        setDatabaseMenuPopupOn(false);
      }
    });

    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if (e.code === 'MetaLeft') {
          setNodeHoverActive(false);
        }
      },
      false
    );

    document.addEventListener(
      'keyup',
      (e: KeyboardEvent) => {
        if (e.code === 'MetaLeft') {
          setNodeHoverActive(true);
        }
      },
      false
    );
  };

  // https://github.com/wbkd/react-flow/issues/2580
  const onNodeMouseEnter = useCallback(
    (_: any, node: Node) => {
      if (!nodeHoverActive) {
        return;
      }

      const state = store.getState();
      state.resetSelectedElements();
      state.addSelectedNodes([node.id]);

      const connectedEdges = getConnectedEdges([node], edges);
      setEdges((eds) => {
        return eds.map((ed) => {
          if (connectedEdges.find((e) => e.id === ed.id)) {
            setHighlightEdgeClassName(ed);
          }

          return ed;
        });
      });
    },
    [edges, nodeHoverActive, setEdges, store]
  );

  const onNodeMouseLeave = useCallback(
    (_: any, node: Node) => {
      if (!nodeHoverActive) {
        return;
      }

      const state = store.getState();
      state.resetSelectedElements();

      setEdges((eds) => eds.map((ed) => setEdgeClassName(ed)));

      // https://stackoverflow.com/questions/2520650/how-do-you-clear-the-focus-in-javascript
      (document.activeElement as HTMLElement).blur();
    },
    [nodeHoverActive, setEdges, store]
  );

  const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    const { edges: edgez } = params;
    edgez.forEach((ed) => {
      const svg = document
        .querySelector('.react-flow__edges')
        ?.querySelector(`[data-testid="rf__edge-${ed.id}"]`);
      moveSVGInFront(svg);
    });
  }, []);

  const handleNodesChange = useCallback(
    (nodeChanges: NodeChange[]) => {
      nodeChanges.forEach((nodeChange) => {
        if (nodeChange.type === 'position' && nodeChange.positionAbsolute) {
          // nodeChange.positionAbsolute contains new position
          const node = nodes.find((nodea) => nodea.id === nodeChange.id);

          if (!node) {
            return;
          }

          const incomingNodes = getIncomers(node, nodes, edges);
          incomingNodes.forEach((incomingNode) => {
            const edge = edges.find((edgea) => {
              return edgea.id === `${incomingNode.id}-${node.id}`;
            });

            const edgeConfig = currentDatabase.edgeConfigs.find(
              (edgeConfigz: EdgeConfig) => {
                return (
                  edgeConfigz.source === incomingNode.id &&
                  edgeConfigz.target === node.id
                );
              }
            );

            if (nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if (edge && ed.id === edge.id) {
                    const sourcePosition =
                      edgeConfig!.sourcePosition ||
                      calculateSourcePosition(
                        incomingNode.width as number,
                        incomingNode.position.x,
                        node.width as number,
                        nodeChange.positionAbsolute!.x
                      );
                    const targetPosition =
                      edgeConfig!.targetPosition ||
                      calculateTargetPosition(
                        incomingNode.width as number,
                        incomingNode.position.x,
                        node.width as number,
                        nodeChange.positionAbsolute!.x
                      );

                    const sourceHandle = `${
                      edgeConfig!.sourceKey
                    }-${sourcePosition}`;
                    const targetHandle = `${
                      edgeConfig!.targetKey
                    }-${targetPosition}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
                  }

                  return ed;
                })
              );
            }
          });

          const outgoingNodes = getOutgoers(node, nodes, edges);
          outgoingNodes.forEach((targetNode) => {
            const edge = edges.find((edgee) => {
              return edgee.id === `${node.id}-${targetNode.id}`;
            });

            const edgeConfig = currentDatabase.edgeConfigs.find(
              (edgeConfige: EdgeConfig) => {
                return (
                  edgeConfige.source === nodeChange.id &&
                  edgeConfige.target === targetNode.id
                );
              }
            );

            if (nodeChange.positionAbsolute?.x) {
              setEdges((eds) =>
                eds.map((ed) => {
                  if (edge && ed.id === edge.id) {
                    const sourcePosition =
                      edgeConfig!.sourcePosition ||
                      calculateSourcePosition(
                        node.width as number,
                        nodeChange.positionAbsolute!.x,
                        targetNode.width as number,
                        targetNode.position.x
                      );
                    const targetPosition =
                      edgeConfig!.targetPosition ||
                      calculateTargetPosition(
                        node.width as number,
                        nodeChange.positionAbsolute!.x,
                        targetNode.width as number,
                        targetNode.position.x
                      );

                    const sourceHandle = `${
                      edgeConfig!.sourceKey
                    }-${sourcePosition}`;
                    const targetHandle = `${
                      edgeConfig!.targetKey
                    }-${targetPosition}`;

                    ed.sourceHandle = sourceHandle;
                    ed.targetHandle = targetHandle;
                    ed.className = edgeClassName(edgeConfig, targetPosition);
                    ed.markerEnd = edgeMarkerName(edgeConfig, targetPosition);
                  }

                  return ed;
                })
              );
            }
          });
        }
      });

      onNodesChange(nodeChanges);
    },
    [onNodesChange, setEdges, nodes, edges, currentDatabase]
  );

  // https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css
  return (
    <div className="Flow" style={{ height: '93vh' }}>
      <Markers />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        snapToGrid
        fitView
        snapGrid={[4, 4]}
        nodeTypes={nodeTypes}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onSelectionChange={onSelectionChange}
      >
        <Controls showInteractive={false}>
          <ControlButton
            onClick={() => {
              setInfoPopupOn(!infoPopupOn);
            }}
            className="into-popup-toggle"
          >
            <InfoIcon />
          </ControlButton>
          <ControlButton
            onClick={() => {
              setDatabaseMenuPopupOn(true);
            }}
            className="into-popup-toggle"
          >
            <DatabaseIcon />
          </ControlButton>
        </Controls>
        <Background color="#ffffff" gap={16} />
      </ReactFlow>
      {infoPopupOn && (
        <InfoPopup
          onClose={() => {
            setInfoPopupOn(false);
          }}
        />
      )}
      {unknownDatasetOn && (
        <DatabaseMenuPopup
          headline="Unknown dataset :warning:"
          subheadline="Available datasets :point_down:"
          onClose={() => {
            setUnknownDatasetOn(false);
          }}
        />
      )}
      {databaseMenuPopupOn && (
        <DatabaseMenuPopup
          headline="Choose a dataset :point_down:"
          onClose={() => {
            setDatabaseMenuPopupOn(false);
          }}
        />
      )}
    </div>
  );
}

// https://codesandbox.io/s/elastic-elion-dbqwty?file=/src/App.js
// eslint-disable-next-line import/no-anonymous-default-export
function Visualizer(props: VisualizerProps) {
  const [currentDatabase, setCurrentDatabase] = useState({
    tables: [],
    edgeConfigs: [],
    schemaColors: {},
    tablePositions: {},
  } as DatabaseConfig);

  const [databasesLoaded, setDatabasesLoaded] = useState(false);
  const { database } = props;
  useEffect(() => {
    loadDatabases()
      .then((data) => {
        if (!database || !(database in data)) {
          return 's';
        }
        const databaseConfig = data[database as string] as DatabaseConfig;
        setCurrentDatabase(databaseConfig);
        setDatabasesLoaded(true);
        return 's';
      })
      .catch(() => {
        console.log('error');
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);
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
      <Drawer
        size={320}
        opened={drawerOpened}
        withOverlay={false}
        onClose={drawerClose}
        withCloseButton={false}
        padding={0}
        shadow="sm"
      >
        <Drawer.Body m={0} bg="#673ab2" h="100%">
          <Flex bg="#38235c" p="sm" justify="space-between">
            <Button color="teal" variant="filled" onClick={drawerClose}>
              👑 Create Table
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
          <Divider />
        </Drawer.Body>
      </Drawer>
      <ReactFlowProvider>
        {databasesLoaded && <Flow currentDatabase={currentDatabase} />}
      </ReactFlowProvider>
    </AppShell>
  );
}

export default Visualizer;
