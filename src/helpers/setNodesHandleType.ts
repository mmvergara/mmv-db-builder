/* eslint-disable import/prefer-default-export */
import { Node } from 'reactflow';
import { CustomNode, Relation } from 'types/types';

export type NodeType = Node<
  {
    tableName: string;
    columns: {
      colName: string;
      colDataType: string;
      colIsKey: boolean;
      colIsNullable: boolean;
    }[];
  },
  string | undefined
>;

export const setNodesHandleType = (node: NodeType[], relations: Relation[]) => {
  const newNodes = node.map((n: NodeType) => {
    const newColumns = n.data.columns.map((col) => {
      const relation = relations.find(
        (rel) =>
          rel.sourceTable === n.data.tableName && rel.sourceKey === col.colName
      );
      const relation2 = relations.find(
        (rel) =>
          rel.targetTable === n.data.tableName && rel.targetKey === col.colName
      );
      if (relation) {
        return {
          ...col,
          colHandleType:
            col.colName === relation.sourceKey ? 'source' : 'target',
        };
      }
      if (relation2) {
        return {
          ...col,
          colHandleType:
            col.colName === relation2.sourceKey ? 'source' : 'target',
        };
      }
      return col;
    });
    return {
      ...n,
      data: {
        ...n.data,
        columns: newColumns,
      },
    };
  });
  return newNodes as Node<CustomNode>[];
};
