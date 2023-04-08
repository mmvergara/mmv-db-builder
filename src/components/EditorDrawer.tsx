/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Drawer, Button, DrawerProps, Alert } from '@mantine/core';
import { Relations, TableData } from 'utilities/types/dbTypes';
import { useState, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-one_dark';
import {
  editorValToDMBLObject,
  parsedDbmlToTableData,
} from 'utilities/parsers';
import { showNotification } from '@mantine/notifications';
import { initialTablesDBML } from 'utilities/initialData';

export default function EditorDrawer(
  props: DrawerProps & {
    onTableUpdate: (Data: TableData[]) => void;
    onRelationsUpdate: (data: Relations[]) => void;
  }
) {
  const { onTableUpdate, onRelationsUpdate, onClose, ...DrawerPassedProps } =
    props;

  const [error, setError] = useState<string | null>(null);
  const [editorValue, setEditorValue] = useState<string>(initialTablesDBML());

  const timerRef = useRef<any>();
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    setError(null);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!value) {
        onTableUpdate([]);
        return;
      }

      const { data, error: err } = editorValToDMBLObject(value);
      if (err) {
        setError(error);
        return;
      }

      try {
        if (!data) throw new Error('No data');
        if (data) onTableUpdate(parsedDbmlToTableData(data));
      } catch {
        showNotification({
          title: 'Error',
          message: "Something went wrong, can't parse DB",
          color: 'red',
        });
      }
    }, 1000);
  };

  return (
    <Drawer
      {...DrawerPassedProps}
      onClose={onClose}
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
          <Button color="teal" sx={{ flexGrow: 3 }}>
            Edit Relations
          </Button>{' '}
          <Button color="red" onClick={onClose} sx={{ flexGrow: 1 }}>
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
  );
}
