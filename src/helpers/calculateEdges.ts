import { Node } from 'reactflow';
import { CustomEdge, CustomNode, Relation } from 'types/types';

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

const determineMarkers = (relation: Relation) => {
  if (relation.relation === 'one-to-one') {
    return {
      markerStart: 'hasOneReversed',
      markerEnd: 'hasOne',
    };
  }
  if (relation.relation === 'one-to-many') {
    return {
      markerStart: 'hasOne',
      markerEnd: 'hasManyReversed',
    };
  }
  if (relation.relation === 'many-to-one') {
    return {
      markerStart: 'hasManyReversed',
      markerEnd: 'hasOne',
    };
  }
  if (relation.relation === 'many-to-many') {
    return {
      markerStart: 'hasManyReversed',
      markerEnd: 'hasMany',
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

      const edge = {
        id: `${sourceNode.id}-${targetNode.id}`,
        source: sourceNode.id,
        target: targetNode.id,
        sourceHandle,
        targetHandle,
        type: 'smoothstep',
        ...determineMarkers(relation),
      };
      initialEdges.push(edge);
    }
  });
  return initialEdges;
};
