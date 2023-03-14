import { Node } from 'reactflow';
import { CustomEdge, CustomNode, MarkerType, Relation } from 'types/types';
import uniqid from 'uniqid';

export const calculateSourcePosition = (
  sourceNodeWidth: number,
  sourceNodeX: number,
  targetNodeWidth: number,
  targetNodeX: number
): string => {
  const leftBoundary = targetNodeX + targetNodeWidth;
  const rightBoundary = targetNodeX;

  if (sourceNodeX + 50 > leftBoundary) return 'left';
  if (sourceNodeX + sourceNodeWidth - 50 < rightBoundary) return 'right';
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
  if (sourceNodeX + sourceNodeWidth - 50 < leftBoundary) return 'left';
  if (sourceNodeX + 50 > rightBoundary) return 'right';
  return 'left';
};

const determineMarkers = (
  relation: Relation
): {
  markerStart: MarkerType;
  markerEnd: MarkerType;
} => {
  if (relation.relation === 'one-to-one') {
    return {
      markerStart: 'hasOneReversed',
      markerEnd: 'hasOneReversed',
    };
  }
  if (relation.relation === 'one-to-many') {
    return {
      markerStart: 'hasOneReversed',
      markerEnd: 'hasManyReversed',
    };
  }
  if (relation.relation === 'many-to-one') {
    return {
      markerStart: 'hasManyReversed',
      markerEnd: 'hasOneReversed',
    };
  }
  if (relation.relation === 'many-to-many') {
    return {
      markerStart: 'hasManyReversed',
      markerEnd: 'hasManyReversed',
    };
  }
  return {
    markerStart: 'hasManyReversed',
    markerEnd: 'hasMany',
  };
};

export const calculateEdges = (
  nodes: Node<CustomNode>[],
  relations: Relation[]
): CustomEdge[] => {
  const initialEdges: CustomEdge[] = [];
  relations.forEach((relation: Relation) => {
    const sourceNode = nodes.find(
      (node: Node<CustomNode>) => node.id === relation.sourceTable
    );
    const targetNode = nodes.find(
      (node: Node<CustomNode>) => node.id === relation.targetTable
    );

    if (sourceNode && targetNode) {
      const sourcePosition = calculateSourcePosition(
        sourceNode.width as number,
        sourceNode!.position.x,
        targetNode.width as number,
        targetNode.position.x
      );
      const targetPosition = calculateTargetPosition(
        sourceNode.width as number,
        sourceNode!.position.x,
        targetNode.width as number,
        targetNode.position.x
      );
      const sourceHandle = `${relation.sourceKey}-${sourcePosition}`;
      const targetHandle = `${relation.targetKey}-${targetPosition}`;

      const edge: CustomEdge = {
        id: `${sourceNode.id}-${targetNode.id}-${uniqid()}`,
        source: sourceNode.id,
        target: targetNode.id,
        sourceHandle,
        targetHandle,
        type: 'smoothstep',
        selected: true,
        ...determineMarkers(relation),
      };
      initialEdges.push(edge);
    }
  });
  return initialEdges;
};
