import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


function TableNode({ data }: any) {
  console.log(data);
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);
  const isConnectable = true;
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <input
          id="text"
          name="text"
          value={data.value}
          onChange={onChange}
          className="nodrag"
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TableNode;
