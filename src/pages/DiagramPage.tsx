import { Box } from '@mantine/core';
import DraggableTable from 'components/DraggableTable';
import { Xwrapper } from 'react-xarrows';
import { Relations, TableData } from 'utilities/types/dbTypes';
import { useState } from 'react';
import RelationArrows from 'components/RelationArrows';

export default function DiagramPage() {
  const [tables, setTables] = useState<TableData[]>([
    {
      tableName: 'users',
      columns: [
        { columnName: 'id', columnType: 'int', columnIsKey: true },
        { columnName: 'name', columnType: 'varchar', columnIsKey: false },
        { columnName: 'email', columnType: 'varchar', columnIsKey: false },
      ],
    },
    {
      tableName: 'posts',
      columns: [
        { columnName: 'id', columnType: 'int', columnIsKey: true },
        { columnName: 'title', columnType: 'varchar', columnIsKey: false },
        { columnName: 'content', columnType: 'text', columnIsKey: false },
        { columnName: 'user_id', columnType: 'int', columnIsKey: false },
      ],
    },
    {
      tableName: 'comments',
      columns: [
        { columnName: 'id', columnType: 'int', columnIsKey: true },
        { columnName: 'content', columnType: 'text', columnIsKey: false },
        { columnName: 'user_id', columnType: 'int', columnIsKey: false },
        { columnName: 'post_id', columnType: 'int', columnIsKey: false },
      ],
    },
  ]);
  const [relations, setRelations] = useState<Relations[]>([
    {
      source_table: 'users',
      source_column: 'id',
      target_table: 'posts',
      target_column: 'user_id',
      relation: 'one-to-many',
    },
    {
      source_table: 'users',
      source_column: 'id',
      target_table: 'comments',
      target_column: 'user_id',
      relation: 'one-to-many',
    },
  ]);
  const [fontSize, setFontSize] = useState(10);

  return (
    <Box>
      <Box sx={{ width: '100%', backgroundColor: 'red', padding: 10 }}>
        NAV BAR
      </Box>
      <Xwrapper>
        <Box
          sx={{
            position: 'absolute',
            overflow: 'hidden',
            height: '100%',
            width: '100%',
          }}
        >
          {tables.map(({ tableName, columns }) => {
            return (
              <DraggableTable
                tableName={tableName}
                columns={columns}
                fontSize={fontSize}
              />
            );
          })}
          {relations.map((relation) => (
            <RelationArrows relationData={relation} fontSize={fontSize} />
          ))}
        </Box>
      </Xwrapper>
    </Box>
  );
}
