import Draggable, { ControlPosition } from 'react-draggable';
import { Box, Title } from '@mantine/core';
import { randomId } from 'utilities/helpers';
import { useXarrow } from 'react-xarrows';
import { TableData } from 'utilities/types/dbTypes';
import useLocalStorage from 'utilities/hooks/useLocalStorage';
import TableColumn from './TableColumn';

export default function DraggableTable(
  table: TableData & { fontSize: number }
) {
  const { tableName, columns, fontSize } = table;
  const updateXarrow = useXarrow();
  const className = randomId(tableName);

  const { s: position, sS: setPosition } = useLocalStorage<ControlPosition>(
    `${tableName}-position`,
    { x: 0, y: 0 }
  );

  return (
    <Draggable
      onDrag={updateXarrow}
      onStop={(_, { x, y }) => {
        setPosition({ x, y });
      }}
      handle={`.${className}`}
      bounds="parent"
      defaultPosition={position}
    >
      <Box
        className={className}
        sx={{
          width: 'fit-content',
          backgroundColor: 'white',
          borderRadius: '3px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.05), 0 1px 12px 0 rgba(0,0,0,.2)',
          borderTop: '5px solid #6366f1',
        }}
      >
        <Title
          order={5}
          sx={{
            backgroundColor: '#ebf4ff',
            padding: '4px 10px',
            fontSize,
          }}
        >
          {tableName}
        </Title>
        {columns.map((column) => {
          return (
            <TableColumn
              columnData={column}
              tableName={tableName}
              fontSize={fontSize}
            />
          );
        })}
      </Box>
    </Draggable>
  );
}
