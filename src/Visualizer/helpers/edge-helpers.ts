import { Edge } from 'reactflow';

export const edgeClassName = (edgeConfig: any, targetPosition?: string) => {
  let className =
    edgeConfig.relation === 'hasOne' ? 'has-one-edge' : 'has-many-edge';

  if (edgeConfig.targetPosition) {
    if (edgeConfig.targetPosition === 'right') {
      className += '-reversed';
    }
  } else if (targetPosition === 'right') {
    className += '-reversed';
  }

  return className;
};

export const edgeMarkerName = (edgeConfig: any, targetPosition?: string) => {
  let markerName = edgeConfig.relation === 'hasOne' ? 'hasOne' : 'hasMany';

  if (edgeConfig.targetPosition) {
    if (edgeConfig.targetPosition === 'right') {
      markerName += 'Reversed';
    }
  } else if (targetPosition === 'right') {
    markerName += 'Reversed';
  }

  return markerName;
};

export const setEdgeClassName = (edge: Edge) => {
  if (edge.className?.includes('has-many-edge-reversed')) {
    edge.className = 'has-many-edge-reversed';
    edge.markerEnd = 'hasManyReversed';
  } else if (edge.className?.includes('has-many-edge')) {
    edge.className = 'has-many-edge';
    edge.markerEnd = 'hasMany';
  } else if (edge.className?.includes('has-one-edge-reversed')) {
    edge.className = 'has-one-edge-reversed';
    edge.markerEnd = 'hasOneReversed';
  } else if (edge.className?.includes('has-one-edge')) {
    edge.className = 'has-one-edge';
    edge.markerEnd = 'hasOne';
  }

  return edge;
};
