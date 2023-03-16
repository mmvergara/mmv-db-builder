/* eslint-disable no-unused-vars */
import { calculateEdges } from 'helpers/calculateEdges';
import { setNodesHandleType } from 'helpers/setNodesHandleType';
import { config } from 'process';
import {
  Background,
  Node,
  OnMove,
  Position,
  ReactFlow,
  XYPosition,
} from 'reactflow';
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
  nodePositions,
  nodes,
  relations,
}: Props) {
  const getInitialNodes = (
    rawNode: TableNodeType[],
    positions: nodePosition[]
  ) => {
    const nodesWithPositions = rawNode.map((n) => {
      const foundPosition = positions.find((p) => p.nodeId === n.id);
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
  const noded = getInitialNodes(nodes, nodePositions);
  const edges = calculateEdges(noded, relations);
  console.log('edges', edges);
  console.log('noded', noded);
  return (
    <div style={{ height: '97vh' }}>
      <ReactFlow
        nodes={noded}
        edges={edges}
        nodeTypes={nodeType}
        onNodeDrag={(e, n) => handleNodeDrag(n.id, n.position)}
        defaultViewport={{ zoom: 1, x: 250, y: 250 }}
      >
        <Background gap={[16, 16]} />
      </ReactFlow>
    </div>
  );
}

export default MainReactFlow;
