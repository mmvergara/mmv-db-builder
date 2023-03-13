import { useState } from 'react';
import { XYPosition } from 'reactflow';
import { nodePosition } from 'types/types';
import MainReactFlow from './MainReactFlow';

function FlowPage() {
  const [nodePositions, setNodePositions] = useState<nodePosition[]>([
    { nodeId: 'a', position: { x: 0, y: 55 } },
  ]);

  const onNodeDrag = (nodeId: string, newPosition: XYPosition) => {
    setNodePositions((lastNodePositions) => {
      return lastNodePositions.map((n) => {
        if (n.nodeId === nodeId) return { ...n, position: newPosition };
        return n;
      });
    });
  };

  // edges will depend on relations and node defined on FlowPage
  // calculate edges willbe on MainReactFlow

  return (
    <>
      <MainReactFlow
        nodePositions={nodePositions}
        handleNodeDrag={onNodeDrag}
      />
      <div>{}</div>
    </>
  );
}

export default FlowPage;
