/* eslint-disable no-unused-vars */
import { calculateEdges } from 'helpers/calculateEdges';
import { setNodesHandleType } from 'helpers/setNodesHandleType';
import { useRef, useState } from 'react';
import { Background, ReactFlow, XYPosition } from 'reactflow';
import { nodePosition, RelationType, TableNodeType } from 'types/types';
import nodeType from './CustomTableNode';

interface Props {
  handleNodeDrag: (nodeId: string, newPosition: XYPosition) => void;
  nodePositions: nodePosition[];
  nodes: TableNodeType[];
  relations: RelationType[];
}

function MainReactFlow({
  handleNodeDrag,
  nodePositions: initialNodePositions,
  nodes,
  relations,
}: Props) {
  const [positions, setPositions] =
    useState<nodePosition[]>(initialNodePositions);
  const getInitialNodes = (
    rawNode: TableNodeType[],
    positionsz: nodePosition[]
  ) => {
    const nodesWithPositions = rawNode.map((n) => {
      const foundPosition = positionsz.find((p) => p.nodeId === n.id);
      if (foundPosition && n.position) {
        n.position = foundPosition.position;
        n.width = 300;
        return n;
      }
      n.position = { x: 0, y: 0 };
      n.width = 300;
      return n;
    });
    const nodesWithHandleType = setNodesHandleType(
      nodesWithPositions,
      relations
    );
    return nodesWithHandleType;
  };

  const noded = getInitialNodes(nodes, positions);
  const edges = calculateEdges(noded, relations);
  const onNodeDrag = (nodeId: string, newPosition: XYPosition) => {
    // if node is not in nodePositions, add it
    if (!positions.find((n) => n.nodeId === nodeId)) {
      setPositions((lastNodePositions) => {
        if (lastNodePositions.find((n) => n.nodeId === nodeId))
          return lastNodePositions;
        return [...lastNodePositions, { nodeId, position: newPosition }];
      });
      return;
    }
    // if node is in nodePositions, update it
    setPositions((lastNodePositions) => {
      return lastNodePositions.map((n) => {
        if (n.nodeId === nodeId) return { ...n, position: newPosition };

        return n;
      });
    });
  };

  const timerRef = useRef();
  const handleDrag = (e: any, n: any) => {
    onNodeDrag(n.id, n.position);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleNodeDrag(n.id, n.position);
    }, 1000);
  };
  return (
    <div style={{ height: '97vh' }}>
      <ReactFlow
        nodes={noded}
        edges={edges}
        nodeTypes={nodeType}
        onNodeDrag={handleDrag}
        defaultViewport={{ zoom: 1, x: 250, y: 250 }}
      >
        <Background gap={[16, 16]} />
      </ReactFlow>
    </div>
  );
}

export default MainReactFlow;
