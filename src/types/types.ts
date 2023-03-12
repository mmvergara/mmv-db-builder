export type Relation = {
  sourceTable: string;
  sourceKey: string;
  targetTable: string;
  targetKey: string;
  relation: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
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

export type MarkerType =
  | 'hasManyReversed'
  | 'hasOneReversed'
  | 'hasMany'
  | 'hasOne';

export type CustomEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type: string;
  selected: boolean;
  markerStart: MarkerType;
  markerEnd: MarkerType;
  className?: string;
};
