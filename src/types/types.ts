import { Node, XYPosition } from 'reactflow';

export type RelationType = {
  relationId: string;
  sourceTable: string;
  sourceKey: string;
  targetTable: string;
  targetKey: string;
  relation: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
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

export type CustomNodeColumn = {
  colName: string;
  colDataType: string;
  colIsKey: boolean;
  colIsNullable: boolean;
  colHandleType?: 'source' | 'target';
};

export type CustomNode = {
  tableName: string;
  columns: CustomNodeColumn[];
};

export type TableNodeType = Node<CustomNode>;

export type nodePosition = {
  nodeId: string;
  position: XYPosition;
};

// array of mysql data types
const mysqlDataTypes = ['bigint', 'boolean', 'char', 'int', 'text', 'varchar'];

// class to create a custom node
class CustomNodeClass {
  id: string;
  type: string;
  data: CustomNode;
  position: XYPosition;
  className?: string;

  constructor(
    id: string,
    type: string,
    data: CustomNode,
    position: XYPosition,
    className?: string
  ) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.position = position;
    this.className = className;
  }
}

// class to create a custom edge
class CustomEdgeClass {
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

  constructor(
    id: string,
    source: string,
    target: string,
    sourceHandle: string,
    targetHandle: string,
    type: string,
    selected: boolean,
    markerStart: MarkerType,
    markerEnd: MarkerType,
    className?: string
  ) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.sourceHandle = sourceHandle;
    this.targetHandle = targetHandle;
    this.type = type;
    this.selected = selected;
    this.markerStart = markerStart;
    this.markerEnd = markerEnd;
    this.className = className;
  }
}
