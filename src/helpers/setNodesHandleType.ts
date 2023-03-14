/* eslint-disable import/prefer-default-export */
import { Node } from 'reactflow';
import { CustomNode, RelationType } from 'types/types';

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

export const setNodesHandleType = (
  node: NodeType[],
  relations: RelationType[]
) => {
  const newNodes = node.map((n: NodeType) => {
    const newColumns = n.data.columns.map((col) => {
      const relation = relations.find((r) => {
        return (
          r.sourceTable === n.data.tableName &&
          r.sourceKey === `${r.sourceTable}-${col.colName}`
        );
      });
      const relation2 = relations.find(
        (r) =>
          r.targetTable === n.data.tableName &&
          r.targetKey === `${r.targetTable}-${col.colName}`
      );

      if (relation) {
        return {
          ...col,
          colHandleType:
            `${relation.sourceTable}-${col.colName}` === relation.sourceKey
              ? 'source'
              : 'target',
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
