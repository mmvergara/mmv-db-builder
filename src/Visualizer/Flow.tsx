import { nodeTypes } from 'config/nodeTypes';
import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useStoreApi,
  getConnectedEdges,
  OnSelectionChangeParams,
  NodeChange,
  getIncomers,
  getOutgoers,
  ReactFlowInstance,
} from 'reactflow';

import { initializeNodes } from './helpers';

import { EdgeConfig, DatabaseConfig } from './types';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';
import './Style';
import {
  calculateEdges,
  calculateSourcePosition,
  calculateTargetPosition,
} from './helpers/calculators';
import {
  edgeClassName,
  edgeMarkerName,
  setEdgeClassName,
  setHighlightEdgeClassName,
} from './helpers/edge-helpers';
import { moveSVGInFront } from './helpers/ui-helpers';
import Markers from './components/Markers';

interface FlowProps {
  currentDatabase: DatabaseConfig;
}

function Flow(props: FlowProps) {
  const { currentDatabase } = props;
  const initialNodes = initializeNodes(currentDatabase);
  const store = useStoreApi();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeHoverActive, setNodeHoverActive] = useState(true);

  const onInit = (instance: ReactFlowInstance) => {
    const noder = instance.getNodes();
    const initialEdges = calculateEdges(noder, currentDatabase);
    setEdges(() => initialEdges);
  };

  // https://github.com/wbkd/react-flow/issues/2580
  const onNodeMouseEnter = useCallback(
    (_: any, node: Node) => {
      if (!nodeHoverActive) return;
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

  const onNodeMouseLeave = useCallback(() => {
    if (!nodeHoverActive) return;
    const state = store.getState();
    state.resetSelectedElements();
    setEdges((eds) => eds.map((ed) => setEdgeClassName(ed)));
    // https://stackoverflow.com/questions/2520650/how-do-you-clear-the-focus-in-javascript
    (document.activeElement as HTMLElement).blur();
  }, [nodeHoverActive, setEdges, store]);

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
        <Controls showInteractive={false} showZoom={false} />
        <Background color="#ffffff" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
