/* eslint-disable no-restricted-globals */
/* eslint-disable no-extra-boolean-cast */
import { Alert, Box, Button, Drawer, NumberInput } from '@mantine/core';
import { initialRelations, initialTablesDBML } from 'utilities/initialData';
import { Relations, TableData } from 'utilities/types/dbTypes';
import { useRef, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  editorValToDMBLObject,
  parsedDbmlToTableData,
} from 'utilities/parsers';
import useLocalStorage from 'utilities/hooks/useLocalStorage';
import RelationsModal from 'components/RelationsModal';
import MainDiagram from 'components/MainDiagram';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-one_dark';
import ExportModal from 'components/ExportModal';

export default function DiagramPage() {
  const { s: relations, sS: setRelations } = useLocalStorage<Relations[]>(
    'relations',
    initialRelations
  );
  const { s: fontSize, sS: setFontSize } = useLocalStorage<number>(
    'fontSize',
    16
  );

  const [error, setEditorErr] = useState<string | null>(null);
  const { s: editorValue, sS: setEditorValue } = useLocalStorage<string>(
    'dbml-string',
    initialTablesDBML()
  );
  const [tables, setTables] = useState<TableData[]>(
    !!editorValue
      ? parsedDbmlToTableData(editorValToDMBLObject(editorValue).data)
      : []
  );

  const timerRef = useRef<any>();
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    setEditorErr(null);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!value) {
        setTables([]);
        return;
      }
      const { data, error: e } = editorValToDMBLObject(value);
      if (e) {
        setEditorErr(e);
        return;
      }
      try {
        if (!data) throw new Error('No data');
        if (data) setTables(parsedDbmlToTableData(data));
      } catch {
        showNotification({
          title: 'Error',
          message: "Something went wrong, can't parse DB",
          color: 'red',
        });
      }
    }, 1000);
  };

  const resetPositionHandler = () => {
    const allLocalStoragekeys = Object.keys(localStorage).filter((key) =>
      key.includes('position')
    );
    allLocalStoragekeys.forEach((key) => localStorage.removeItem(key));
    location.reload();
  };

  // Drawers and Modals
  const [editorIsOpen, { open: editorOpen, close: editorClose }] =
    useDisclosure(false);
  const [
    relationModalIsOpen,
    { open: relationModalOpen, close: relationModalClose },
  ] = useDisclosure(false);
  const [
    exportModalIsOpen,
    { open: exportModalOpen, close: exportModalClose },
  ] = useDisclosure();
  return (
    <>
      <Drawer
        opened={editorIsOpen}
        onClose={editorClose}
        withCloseButton={false}
        lockScroll={false}
        styles={{
          body: {
            backgroundColor: '#282c34',
            height: '100%',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        withOverlay={false}
      >
        <Box
          sx={{
            backgroundColor: '#282c34',
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            gap: 10,
          }}
        >
          <Box sx={{ display: 'flex', gap: 10 }}>
            <Button
              color="teal"
              onClick={relationModalOpen}
              sx={{ flexGrow: 3 }}
            >
              Edit Relations
            </Button>{' '}
            <Button color="red" onClick={editorClose} sx={{ flexGrow: 1 }}>
              Close
            </Button>
          </Box>
          {error && (
            <Alert color="red" variant="filled" sx={{ fontWeight: 600 }}>
              {error}
            </Alert>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <AceEditor
            mode="sql"
            theme="one_dark"
            value={editorValue}
            onChange={handleEditorChange}
            style={{ minHeight: '100%', height: '100%', width: '100%' }}
            fontSize={18}
          />
        </Box>
      </Drawer>

      {relationModalIsOpen && (
        <RelationsModal
          opened={relationModalIsOpen}
          onClose={relationModalClose}
          editorValue={editorValue}
          tables={tables}
          relations={relations}
          setRelations={setRelations}
        />
      )}
      {!error && exportModalIsOpen && (
        <ExportModal
          opened={exportModalIsOpen}
          onClose={exportModalClose}
          editorValue={editorValue}
          relations={relations}
        />
      )}

      {/* UI */}
      <Box>
        <Box sx={{ width: '100%', backgroundColor: '#282c34', padding: 10 }}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button onClick={editorOpen}>Show Editor</Button>
            <Button
              onClick={exportModalOpen}
              variant="gradient"
              disabled={!!error}
            >
              Export
            </Button>
            <Button onClick={resetPositionHandler}>Reset Position </Button>
            <NumberInput
              defaultValue={fontSize}
              onChange={(v) => setFontSize(Number(v))}
              placeholder="Your age"
              withAsterisk
            />
          </Box>
        </Box>
        <MainDiagram
          fontSize={fontSize}
          relations={relations}
          tables={tables}
        />
      </Box>
      {/* UI */}
    </>
  );
}
