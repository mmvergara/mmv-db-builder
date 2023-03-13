import { Handle, Position, NodeProps } from 'reactflow';
import { Box, Flex, Text } from '@mantine/core';
import uniqid from 'uniqid';
import { CustomNode } from '../types/types';
import KeyIcon from '../components/KeyIcon';

type TableNodeProps = NodeProps<CustomNode>;

function TableNode({ data }: TableNodeProps) {
  return (
    <Box bg="white" m={0}>
      <Text
        bg="green"
        color="white"
        align="center"
        fw={600}
        style={{
          padding: '5px',
          border: '1px solid #CBD2D9',
          borderRadius: '4px 4px 0px 0px',
        }}
      >
        {data.tableName}
      </Text>
      <Flex
        direction="column"
        style={{
          border: '1px solid #CBD2D9',
          borderTop: '0',
          borderRadius: '0 0 4px 4px',
        }}
      >
        {data.columns.map((column) => {
          const { colDataType, colIsKey, colName, colHandleType } = column;
          return (
            <Box key={uniqid()} className="column-name">
              {colHandleType && (
                <Handle
                  type={colHandleType}
                  position={Position.Right}
                  id={`${data.tableName}-${colName}-right`}
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
                  id={`${data.tableName}-${colName}-left`}
                  className={
                    colHandleType === 'source'
                      ? 'left-handle source-handle'
                      : 'left-handle target-handle'
                  }
                />
              )}
              <div className="column-name__inner">
                <Text
                  fw={500}
                  pl={!colIsKey ? 15 : 0}
                  className="column-name__name"
                >
                  {colIsKey && <KeyIcon />}
                  {colName}
                </Text>
                <Text pl={50} fw={600} color="dimmed">
                  {colDataType}
                </Text>
              </div>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}

export const nodeTypes = { TableNode };

export default nodeTypes;
