import { CustomEdge, CustomNode, Relation } from 'types/types';

export const zsd = '';

export const calculateEdges = (
  nodes: { id: string; type: 'TableNode'; data: CustomNode }[],
  relations: Relation[]
): CustomEdge[] => {
  const edges: CustomEdge[] = [];
  console.log(nodes);
  relations.forEach((relation) => {
    console.log(nodes);
    console.log(relation);
    const source = nodes.find(
      (node) => node.data.tableName === relation.sourceTable
    );
    const target = nodes.find(
      (node) => node.data.tableName === relation.targetTable
    );
    if (source && target) {
      const sourceHandle = source.data.columns.find(
        (column) => column.colIsKey
      )?.colName;
      const targetHandle = target.data.columns.find(
        (column) => column.colIsKey
      )?.colName;

      if (sourceHandle && targetHandle) {
        edges.push({
          id: `${relation.sourceTable}-${
            relation.targetTable
          }-${Math.random().toString()}`,
          source: relation.sourceTable,
          target: relation.targetTable,
          sourceHandle: sourceHandle + '-right',
          targetHandle: targetHandle + '-left',
          type: 'smoothstep',
          markerStart: 'hasManyReversed',
          markerEnd: 'hasManyReversed',
        });
      }
    }
  });
  console.log('FINAL');
  console.log(edges);
  return edges;
};
