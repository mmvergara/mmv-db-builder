import { Edge, Node } from 'reactflow';
import { DatabaseConfig, EdgeConfig } from '../types';
import { edgeClassName, edgeMarkerName } from './edge-helpers';

export const calculateSourcePosition = (
  sourceNodeWidth: number,
  sourceNodeX: number,
  targetNodeWidth: number,
  targetNodeX: number
): string => {
  const leftBoundary = targetNodeX + targetNodeWidth;
  const rightBoundary = targetNodeX;
  if (sourceNodeX > leftBoundary) return 'left';
  if (sourceNodeX + sourceNodeWidth < rightBoundary) return 'right';
  return 'left';
};

export const calculateTargetPosition = (
  sourceNodeWidth: number,
  sourceNodeX: number,
  targetNodeWidth: number,
  targetNodeX: number
): string => {
  const leftBoundary = targetNodeX;
  const rightBoundary = targetNodeX + targetNodeWidth;
  if (sourceNodeX + sourceNodeWidth < leftBoundary) return 'left';
  if (sourceNodeX > rightBoundary) return 'right';
  return 'left';
};

export const calculateEdges = (
  nodes: Node[],
  currentDatabase: DatabaseConfig
) => {
  const initialEdges: Edge[] = [];
  currentDatabase.edgeConfigs.forEach((edgeConfig: EdgeConfig) => {
    const sourceNode = nodes.find(
      (node: Node) => node.id === edgeConfig.source
    );
    const targetNode = nodes.find(
      (node: Node) => node.id === edgeConfig.target
    );

    if (sourceNode && targetNode) {
      const sourcePosition =
        edgeConfig.sourcePosition ||
        calculateSourcePosition(
          sourceNode.width as number,
          sourceNode!.position.x,
          targetNode.width as number,
          targetNode!.position.x
        );
      const targetPosition =
        edgeConfig.targetPosition ||
        calculateTargetPosition(
          sourceNode.width as number,
          sourceNode!.position.x,
          targetNode.width as number,
          targetNode!.position.x
        );

      const sourceHandle = `${edgeConfig.sourceKey}-${sourcePosition}`;
      const targetHandle = `${edgeConfig.targetKey}-${targetPosition}`;

      initialEdges.push({
        id: `${edgeConfig.source}-${edgeConfig.target}`,
        source: edgeConfig.source,
        target: edgeConfig.target,
        sourceHandle,
        targetHandle,
        type: 'smoothstep',
        markerEnd: edgeMarkerName(edgeConfig, targetPosition),
        className: edgeClassName(edgeConfig, targetPosition),
      });
    }
  });

  return initialEdges;
};
