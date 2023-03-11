export type Relation = {
  sourceTable: string;
  targetTable: string;
  relation: string;
};

export type CustomNode = {
  tableName: string;
  columns: {
    colName: string;
    colDataType: string;
    colIsKey: boolean;
    colIsNullable: boolean;
    colHandleType?: 'source' | 'target';
  }[];
};

export type CustomEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type: string;
  markerStart: 'hasManyReversed' | 'hasOneReversed';
  markerEnd: 'hasManyReversed' | 'hasOneReversed';
};
