import { Edge } from 'reactflow';
import { moveSVGInFront } from './ui-helpers';

export const setHighlightEdgeClassName = (edge: Edge) => {
  if (edge.className?.includes('has-many-edge-reversed')) {
    edge.className =
      'has-many-edge-reversed has-many-edge-reversed--highlighted';
    edge.markerEnd = 'hasManyReversedHighlighted';

    // https://stackoverflow.com/questions/17786618/how-to-use-z-index-in-svg-elements
    const svg = document
      .querySelector('.react-flow__edges')
      ?.querySelector(`[data-testid="rf__edge-${edge.id}"]`);
    moveSVGInFront(svg);
  } else if (edge.className?.includes('has-many-edge')) {
    edge.className = 'has-many-edge has-many-edge--highlighted';
    edge.markerEnd = 'hasManyHighlighted';

    const svg = document
      .querySelector('.react-flow__edges')
      ?.querySelector(`[data-testid="rf__edge-${edge.id}"]`);
    moveSVGInFront(svg);
  } else if (edge.className?.includes('has-one-edge-reversed')) {
    edge.className = 'has-one-edge-reversed has-one-edge-reversed--highlighted';
    edge.markerEnd = 'hasOneReversedHighlighted';

    const svg = document
      .querySelector('.react-flow__edges')
      ?.querySelector(`[data-testid="rf__edge-${edge.id}"]`);
    moveSVGInFront(svg);
  } else if (edge.className?.includes('has-one-edge')) {
    edge.className = 'has-one-edge has-one-edge--highlighted';
    edge.markerEnd = 'hasOneHighlighted';

    const svg = document
      .querySelector('.react-flow__edges')
      ?.querySelector(`[data-testid="rf__edge-${edge.id}"]`);
    moveSVGInFront(svg);
  }
};

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
