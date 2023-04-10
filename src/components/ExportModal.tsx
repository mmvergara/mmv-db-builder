/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Code,
  CopyButton,
  Modal,
  ModalProps,
  SegmentedControl,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Relations } from 'utilities/types/dbTypes';
import { exporter } from '@dbml/core';

type Props = {
  relations: Relations[];
  editorValue: string;
};
type exportTypes = 'mysql' | 'postgres' | 'mssql';
export default function ExportModal(props: ModalProps & Props) {
  const { relations, editorValue, ...modalProps } = props;
  const [exportType, setExportType] = useState<exportTypes>('mysql');
  const parsedDB = exporter.export(editorValue, exportType);
  return (
    <Modal
      {...modalProps}
      size="lg"
      styles={{ body: { display: 'flex', flexDirection: 'column', gap: 10 } }}
    >
      <Title order={4}>Export Database</Title>
      <SegmentedControl
        sx={{ width: '100%' }}
        data={[
          { label: 'MySql', value: 'mysql' },
          { label: 'Postgres', value: 'postgres' },
          { label: 'MSSQL', value: 'mssql' },
        ]}
        onChange={(value) => setExportType(value as exportTypes)}
      />
      <CopyButton value={parsedDB}>
        {({ copied, copy }) => (
          <Button variant={copied ? 'filled' : 'gradient'} onClick={copy}>
            {copied ? 'Copied!!!' : 'Copy To Clipboard'}
          </Button>
        )}
      </CopyButton>
      <Code block>{parsedDB}</Code>
    </Modal>
  );
}
