import { Box, NumberInput } from '@mantine/core';
import DraggableTable from 'components/DraggableTable';
import { Xwrapper } from 'react-xarrows';
import { Relations, TableData } from 'utilities/types/dbTypes';
import RelationArrows from 'components/RelationArrows';
import { initialRelations, initialTables } from 'utilities/initialData';
import useLocalStorage from 'utilities/hooks/useLocalStorage';

export default function DiagramPage() {
  const { s: tables, sS: setTables } = useLocalStorage<TableData[]>(
    'tables',
    initialTables
  );
  const { s: relations, sS: setRelations } = useLocalStorage<Relations[]>(
    'relations',
    initialRelations
  );
  const { s: fontSize, sS: setFontSize } = useLocalStorage<number>(
    'fontSize',
    10
  );

  return (
    <Box>
      <Box sx={{ width: '100%', backgroundColor: 'red', padding: 10 }}>
        <NumberInput
          defaultValue={fontSize}
          onChange={(v) => setFontSize(Number(v))}
          placeholder="Your age"
          label="Your age"
          withAsterisk
        />
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
