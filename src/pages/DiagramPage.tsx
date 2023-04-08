import { Box, Button, NumberInput } from '@mantine/core';
import DraggableTable from 'components/DraggableTable';
import { Xwrapper } from 'react-xarrows';
import { Relations, TableData } from 'utilities/types/dbTypes';
import RelationArrows from 'components/RelationArrows';
import { initialRelations, initialTableData } from 'utilities/initialData';
import useLocalStorage from 'utilities/hooks/useLocalStorage';
import { useDisclosure } from '@mantine/hooks';
import EditorModal from 'components/EditorDrawer';

export default function DiagramPage() {
  const { s: tables, sS: setTables } = useLocalStorage<TableData[]>(
    'tables',
    initialTableData
  );
  const { s: relations, sS: setRelations } = useLocalStorage<Relations[]>(
    'relations',
    initialRelations
  );
  const { s: fontSize, sS: setFontSize } = useLocalStorage<number>(
    'fontSize',
    16
  );

  const [editorIsOpen, { open: editorOpen, close: editorClose }] =
    useDisclosure(false);

  const handleTableUpdate = (data: TableData[]) => setTables(data);
  const handleRelationsUpdate = setRelations;

  return (
    <>
      <EditorModal
        opened={editorIsOpen}
        onClose={editorClose}
        onTableUpdate={handleTableUpdate}
        onRelationsUpdate={handleRelationsUpdate}
      />
      <Box>
        <Box sx={{ width: '100%', backgroundColor: '#282c34', padding: 10 }}>
          <Button onClick={editorOpen}>Show Editor</Button>
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
              minHeight: '1300px',
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
    </>
  );
}
