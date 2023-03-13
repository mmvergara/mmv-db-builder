/* eslint-disable no-unused-vars */
import {
  Node,
  OnMove,
  Position,
  ReactFlow,
  Viewport,
  XYPosition,
} from 'reactflow';
import { CustomNode, nodePosition } from 'types/types';
import nodeTypesd from './CustomTableNode';

interface Props {
  handleNodeDrag: (nodeId: string, newPosition: XYPosition) => void;
  nodePositions: nodePosition[];
}
export type TableNodeType = Node<CustomNode>;

function MainReactFlow({ handleNodeDrag, nodePositions }: Props) {
  const getInitialNodes = (
    rawNode: TableNodeType[],
    positions: nodePosition[]
  ) => {
    // set positions
    rawNode.map((n) => {
      const foundPosition = positions.find((p) => p.nodeId === n.id);
      if (foundPosition) n.position = foundPosition.position;
      return n;
    });
    console.log(rawNode);
  };
  const nodes: Node[] = [
    { data: { label: 'yo' }, id: 'a', position: { x: 0, y: 0 } },
  ];
  console.log(getInitialNodes(nodes, nodePositions));

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypesd}
        onNodeDrag={(e, n) => handleNodeDrag(n.id, n.position)}
      />
    </div>
  );
}

export default MainReactFlow;
