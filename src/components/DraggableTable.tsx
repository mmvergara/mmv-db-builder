import Draggable from 'react-draggable';
import { Box, Title } from '@mantine/core';
import { randomId } from 'utilities/helpers';
import { useXarrow } from 'react-xarrows';
import TableColumn from './TableColumn';

type props = {
  name: string;
};

export default function DraggableTable({ name }: props) {
  const columns = [
    {
      columnName: 'yoyo',
      columnType: 'varchaar',
      columnIsKey: true,
    },

    {
      columnName: 'yoyo',
      columnType: 'varchar',
      columnIsKey: true,
    },
  ];
  const updateXarrow = useXarrow();

  const className = randomId(name);
  return (
    <Draggable onDrag={updateXarrow} handle={`.${className}`} bounds="parent">
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
          sx={{ backgroundColor: '#ebf4ff', padding: '4px 10px' }}
        >
          {name}
        </Title>
        {columns.map((column) => {
          return <TableColumn columnData={column} tableName={name} />;
        })}
      </Box>
    </Draggable>
  );
}
