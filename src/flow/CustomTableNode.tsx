import { Handle, Position, NodeProps } from 'reactflow';
import { CustomNode } from '../types/types';
import KeyIcon from '../components/KeyIcon';

type TableNodeProps = NodeProps<CustomNode>;

function TableNode({ data }: TableNodeProps) {
  return (
    <div className="table">
      <div style={{ backgroundColor: 'cyan' }} className="table__name">
        {data.tableName}
        <div className="table__description" />
      </div>
      <div className="table__columns">
        {data.columns.map((column, index: any) => {
          const {
            colDataType,
            colIsKey,
            colIsNullable,
            colName,
            colHandleType,
          } = column;

          return (
            <div key={index} className="column-name">
              {colHandleType && (
                <Handle
                  type={colHandleType}
                  position={Position.Right}
                  id={`${colName}-right`}
                  className={
                    colHandleType === 'source'
                      ? 'right-handle source-handle'
                      : 'right-handle target-handle'
                  }
                />
              )}
              {colHandleType && (
                <Handle
                  type={colHandleType}
                  position={Position.Left}
                  id={`${colName}-left`}
                  className={
                    colHandleType === 'source'
                      ? 'left-handle source-handle'
                      : 'left-handle target-handle'
                  }
                />
              )}
              <div className="column-name__inner">
                <div className="column-name__name">
                  {colIsKey && <KeyIcon />}
                  {colName}
                </div>
                <div className="column-name__type">{colDataType}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const nodeTypes = { TableNode };

export default nodeTypes;
